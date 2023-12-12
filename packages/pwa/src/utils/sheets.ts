// @ts-nocheck

import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

import { SUPPORTED_LOCALES } from '../bootstrap/i18n'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '/packages/pwa/src/utils/token.json')
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  '/packages/pwa/src/utils/credentials.json',
)

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

async function generateTranslations(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  for (const locale in SUPPORTED_LOCALES) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1OrGG04VRexivzscOnG0qmr-dAZ0O4gaJm1UbqxNh6k0',
      range: locale,
    })
    const rows = res.data.values
    console.log(rows)

    if (!rows || rows.length === 0) {
      console.log('No data found.')
      return
    }

    const translations = { [locale]: {} }
    for (const row of rows) {
      translations[locale][row[0]] = row[2]
    }

    // Create enum with all the keys of translations
    // const enumName = `${locale}Keys`
    // const enumContent = `export enum ${enumName} {\n${Object.keys(
    //   translations[locale],
    // )
    //   .map(key => `  ${key} = '${key}'`)
    //   .join(',\n')}\n}`
    // .d.ts

    await fs.writeFile(
      path.join(process.cwd(), `packages/pwa/src/locales/${locale}.json`),
      JSON.stringify(translations),
    )
  }
}

authorize().then(generateTranslations).catch(console.error)