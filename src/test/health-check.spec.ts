import { test, expect } from '@playwright/test';
import { LoggerProvider } from '../project/loggerProvider';

const log = LoggerProvider.logger;

test.describe('health-check Playright Starter', () => {

    test('playright API context OK', async ({ request }) => {
        let response = await request.get('https://httpbin.org/get');
        expect(response.status()).toBe(200);
        expect((await response.json())['headers']['User-Agent'].includes('Mozilla/5.0')).toBeTruthy();
        log.debug('debug log API');

    });

    test('playright WEB context OK', async ({ page }) => {
        await page.goto('https://todomvc.com/examples/react/dist/')
        expect(page.url()).toContain('https://todomvc.com/examples/react/dist/');
        log.info('info log WEB');
    });

});
