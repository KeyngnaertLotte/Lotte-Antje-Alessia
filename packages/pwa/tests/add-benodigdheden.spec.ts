import { test, expect } from '@playwright/test'

test('🔐 benodigdheden toevoegen artiest', async ({ page }) => {
  // Open the page.
  await page.goto('http://localhost:5173/auth/login')

  // Fill form inputs
  await page.getByPlaceholder('Email adres').click()
  await page.getByPlaceholder('Email adres').fill(' neffex@lotantsia.com ')
  await page.getByPlaceholder('Email adres').press('Tab')
  await page.getByPlaceholder('Wachtwoord').fill('123456')
  await page.getByPlaceholder('Wachtwoord').press('Tab')

  // Submit form with enter
  await page.getByText('Login').click()

  await page.waitForResponse(response => response.url().includes('/graphql'))

  // // Expect to be redirected to the home page
  // await expect(page.getByText('Login')).toBeVisible()
  await page.getByRole('button', { name: 'item' }).click()
  await page.getByText('geluid').click()
  // click on plus button
  await page.getByTestId('plus').click()
  await page.getByRole('button', { name: 'Bevestigen' }).click()
  await page.getByText('Bestelde items').click()
  await expect(page.getByText('PA-systeem').first()).toBeVisible()
})
