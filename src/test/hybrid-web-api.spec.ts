import { test, expect, APIRequestContext } from '@playwright/test';
import { LoggerProvider } from '../project/loggerProvider';
import { BookingTestConfig } from './booking/bookingTestConfig';
import { HttpbinTestConfig } from './httpbin/httpbinTestConfig';
import { LandingPage } from '../project/booking/web/pages/landingPage';
import { AnythingService } from '../project/httpbin/api/services/anythingService';

const log = LoggerProvider.logger;
let request: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
        baseURL: HttpbinTestConfig.instance.getApiBaseUrl(),
    });
});

test.use({
    baseURL: BookingTestConfig.instance.getWebBaseUrl(),
});

test.describe('hybrid WEB and API contexts', () => {

    test('use WEB and API contexts in single test - 1', async ({ page }) => {
        let landingPage = new LandingPage(page);
        await landingPage.navigate();
        expect(await landingPage.isLoaded()).toBeTruthy();

        let apiService = new AnythingService(request);
        let query = { ids: '1,2,3', enabled: true };
        let response = await apiService.getAnything(query);
        expect(response.status()).toBe(200);
    });

    test('use WEB and API contexts in single test - 2', async ({ page }) => {
        let landingPage = new LandingPage(page);
        await landingPage.navigate();
        expect(await landingPage.isLoaded()).toBeTruthy();

        let apiService = new AnythingService(request);
        let query = { ids: '1,2,3', enabled: true };
        let response = await apiService.getAnything(query);
        expect(response.status()).toBe(200);
    });

});
