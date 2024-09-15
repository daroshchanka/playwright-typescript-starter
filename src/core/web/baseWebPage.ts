import { Page } from '@playwright/test';
import { Logger, ILogObj } from 'tslog';

export class BaseWebPage {

    readonly page: Page;
    readonly log: Logger<ILogObj> = new Logger();


    constructor(page: Page) {
        this.page = page;
    }

    async waitForNetworkIdle(timeoutSec: number = 10) {
        this.log.debug(`[Page] wait for state 'networkidle' timeoutSec: ${timeoutSec}`)
        await this.page.waitForLoadState('networkidle', {timeout: timeoutSec * 1000});
    }

    async waitForDocumentLoaded(timeoutSec: number = 10) {
        this.log.debug(`[Page] wait for state 'domcontentloaded' timeoutSec: ${timeoutSec}`)
        await this.page.waitForLoadState('domcontentloaded', {timeout: timeoutSec * 1000});
    }

    async pause(ms: number) {
        await this.page.waitForTimeout(ms);
    }

}