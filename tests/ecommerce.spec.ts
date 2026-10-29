import { test, expect } from '@playwright/test';

test('add item to cart and reach checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Assert login succeeded — product page should be visible
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText('$29.99');


    // Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Assert cart badge shows 1 item
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Go to cart and checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Assert we reached the checkout information page
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
});

test('shows error on invalid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // Attempt login with wrong password 
    await page.locator('[data-test="username"]').fill('standard_user'); 
    await page.locator('[data-test="password"]').fill('wrong_password'); 
    await page.locator('[data-test="login-button"]').click(); 
    // // Assert an error message appears 
    await expect(page.locator('[data-test="error"]')).toBeVisible(); 
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match'); 
});