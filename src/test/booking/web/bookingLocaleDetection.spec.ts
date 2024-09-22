import { test, expect, devices } from '@playwright/test';
import { BookingTestConfig } from '../bookingTestConfig';

test.use({ 
    baseURL: BookingTestConfig.instance.getWebBaseUrl(),
    locale: 'fr-FR' 
});

test.describe('Booking.com locale detection by browser locale', () => {

    test('should redirect to the target location index page', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle', {timeout: 10 * 1000});
        expect(page.url()).toContain('/index.fr.html');
    });

});
