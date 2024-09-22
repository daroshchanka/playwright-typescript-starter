import { LandingPage } from '../../../project/booking/web/pages/landingPage';
import { test, expect, devices } from '@playwright/test';
import { BookingTestConfig } from '../bookingTestConfig';

test.use({
    baseURL: BookingTestConfig.instance.getWebBaseUrl(),
    isMobile: true,
    viewport: { width: 390, height: 830 },
    deviceScaleFactor: 2,
    headless: true
});


test.describe('Booking.com mobile view', () => {

    test('should see mobile view and can open/close mobile menu drawer', async ({ page }) => {
        let landingPage = new LandingPage(page);
        await landingPage.navigate();
        expect(await landingPage.isMobileViewLoaded()).toBeTruthy();

        await landingPage.openMobileMenu();
        expect(await landingPage.isMobileMenuOpened()).toBeTruthy();
        expect(await landingPage.isMobileMenuCareersItemVisible()).toBeTruthy();

        await landingPage.closeMobileMenu();
        expect(await landingPage.isMobileMenuOpened()).toBeFalsy();
    });

});


