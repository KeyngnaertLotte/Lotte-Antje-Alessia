import { test, expect } from '@playwright/test'

test('🔐 inloggen', async ({ page }) => {
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
  await expect(page.getByText('Hey')).toBeVisible()
})
