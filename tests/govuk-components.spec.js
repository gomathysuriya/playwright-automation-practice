import { test, expect } from '@playwright/test';

test('can check a simple checkbox', async ({ page }) => {
  await page.goto('https://design-system.service.gov.uk/components/checkboxes/');

  const frame = page.locator('iframe[title="Checkboxes example"]').contentFrame();
  const checkbox = frame.getByRole('checkbox', { name: 'Waste from animal carcasses' });

  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test('checking a checkbox reveals conditional content', async ({ page }) => {
  await page.goto('https://design-system.service.gov.uk/components/checkboxes/');

  const conditionalFrame = page.locator('iframe[title*="conditionally revealing content"]');
  await conditionalFrame.scrollIntoViewIfNeeded();

  const frame = conditionalFrame.contentFrame();

  // Check "Phone" — this should reveal a phone number field
  await frame.getByRole('checkbox', { name: 'Phone' }).check();

  // Assert the revealed field is now visible and fill it
  const phoneField = frame.getByRole('textbox', { name: 'Phone number' });
  await expect(phoneField).toBeVisible();
  await phoneField.fill('7548696998');
  await expect(phoneField).toHaveValue('7548696998');
});

test('can simple check radioButton', async ({ page }) => {
  await page.goto('https://design-system.service.gov.uk/components/radios/');
  const radioOption = page.getByRole('radio', { name: 'Royal Navy' });
  await radioOption.check();
  await expect(radioOption).toBeChecked();
});

