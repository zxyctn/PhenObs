const { test, expect } = require('@playwright/test');
const { user } = require('../helpers/login/userEnvironments.js');
const login = require('../helpers/login/login.js');

test.describe('Home page', () => {
    let page = null;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await login(page, user);
        await context.setOffline(true);
    });

    test('Navbar | Brand', async () => {
        // Expect to have "PhenObs | " in the brand
        await expect(page.locator('#brand')).toContainText('PhenObs | ');
        // Expect brand to have home page URL
        await expect(page.locator('#brand')).toHaveAttribute('href', '');

        // Expect to be online
        await expect(page.locator('#online')).toBeHidden();
        await expect(page.locator('#offline')).toBeVisible();
    });

    test('Navbar | Items', async () => {
        // Select Navbar links
        const navLinks = page.locator('.navbar-nav .nav-item .nav-link');
        // Expected options in Navbar
        const navLinkTexts = ['Home', 'Observations', 'Observations', 'Help', 'Sign Out'];

        // Select Observation links
        const observationLinks = page.locator('.dropdown-item');
        // Expected options under Observations
        const observationLinkTexts = ['Local', 'Overview'];

        // Check if all the expected navbar items are found
        for (let i = 0; i < navLinks.length; ++i) {
            expect(navLinks.nth(i).textContent()).toHaveText(navLinkTexts[i]);

            // Check if all offline pages are accessible and others and disabled
            if (
                navLinks.nth(i).textContent() === "Home" ||
                navLinks.nth(i).textContent() === "Sign Out"
            ) {
                expect(navLinks.nth(i)).toHaveClass('nav-link disabled')
            } else {
                expect(navLinks.nth(i)).toHaveClass('nav-link');
            }
        }

        // Check if all the expected observation options are found
        for (let i = 0; i < observationLinks.length; ++i)
            expect(observationLinks.nth(i).textContent()).toHaveText(observationLinkTexts[i]);
    });

    test('Home | Active', async () => {
        // Expect to have active class in class list
        await expect(page.locator('#home')).toHaveClass('nav-link active disabled');
    });

    test("Home | Buttons", async () => {
        // Expect to have Local observations button displayed
        await expect(page.locator('.wide-button.offline-feature')).toHaveText('Local observations');
        // Expect to have Add collection button displayed
        await expect(page.locator('.wide-button.online-feature')).toHaveText('Add collection');

        // Test if the Add collection button works
        await page.locator('.wide-button.online-feature').click();
        // Expect a modal dialog
        await page.waitForSelector('div.modal.fade.show .modal-dialog');
        // Check modal title
        await expect(page.locator('div.modal.fade.show .modal-dialog .modal-title')).toHaveText('Alert');
        // Check modal body
        await expect(page.locator('div.modal.fade.show .modal-dialog .modal-body')).toHaveText('Add functionality is not available in offline mode');
        // Close modal
        await page.locator('div.modal.fade.show .modal-dialog #alert-okay').click();
    });

    test('Home | Jumbotron details', async () => {
        // Expect to have Halle garden name displayed
        await expect(page.locator('div h1.display-3 strong')).toHaveText((`${user.main_garden_name}: ${user.subgarden_name}`));

        // Today's date string
        const todayString = new Date().toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // Expect date string to be equal to today's date string
        await expect(page.locator('#home-date')).toHaveText(todayString);

        // Expect having login name to be displayed in the corner
        await expect(page.locator('div h1.display-4.text-right strong')).toHaveText(user.username);
    });

    test("Imprint", async () => {
        // Expect to have Imprint link displayed
        await expect(page.locator('.imprint')).toHaveText('Imprint');
        // Expect to have /imprint/ URL on the link
        await expect(page.locator('.imprint')).toHaveAttribute('href', '/imprint/');
    });
});
