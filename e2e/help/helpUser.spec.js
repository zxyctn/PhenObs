const { test, expect } = require('@playwright/test');
const { user } = require('../helpers/login/userEnvironments.js');
const login = require('../helpers/login/login.js');

test.describe('Help', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, user);
        await page.goto(process.env.E2E_INDEX + 'help/');
    });

    test.afterAll(async ({ page }) => {
        await page.close();
    });

    test('Are Admin manuals hidden?', async({ page }) => {
        await expect(page.locator(':text("Administration manuals")')).toHaveCount(0);
    });
});
