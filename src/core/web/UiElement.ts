import { Locator, Page, Frame } from '@playwright/test';
import { Logger, ILogObj } from 'tslog';

export class UiElement {

    readonly locator: string;
    log: Logger<ILogObj> = new Logger();

    constructor(locator: string) {
        this.locator = locator;
    }

    static byTestId(testId: string): UiElement {
        return new UiElement(`//*[@data-testid="${testId}"]`)
    }

    static byId(id: string): UiElement {
        return new UiElement(`//*[@id="${id}"]`)
    }

    static byXpath(locator: string): UiElement {
        return new UiElement(locator);
    }

    get(page: Page | Frame): Locator {
        return page.locator(this.locator).first();
    }

    async getList(page: Page | Frame): Promise<Array<UiElement>> {
        let count: number = await page.locator(this.locator).count();
        let result: Array<UiElement> = [];
        [...Array(count).keys()].forEach(number => {
            result.push(new UiElement(`(${this.locator})[${number + 1}]`))
        });
        this.log.debug(`[${this.locator}] getList, found - ${result.length}`)
        return result;
    }

    async isVisible(page: Page | Frame): Promise<boolean> {
        let result = await this.get(page).isVisible();
        this.log.debug(`[${this.locator}] isVisible - ${result}`)
        return result;
    }

    async getText(page: Page | Frame): Promise<string | null> {
        let result = await this.get(page).textContent();
        this.log.debug(`[${this.locator}] getText - ${result}`)
        return result;
    }

    async getAttribute(page: Page | Frame, name: string): Promise<string | null> {
        let result = await this.get(page).getAttribute(name);
        this.log.debug(`[${this.locator}] getAttribute(${name}) - ${result}`)
        return result;
    }

    async isChecked(page: Page | Frame): Promise<boolean> {
        let result = await this.get(page).isChecked();
        this.log.debug(`[${this.locator}] isChecked() - ${result}`)
        return result;
    }

    async waitForVisible(page: Page | Frame, timeoutSec: number = 10) {
        this.log.debug(`[${this.locator}] waitForVisible(${timeoutSec})`)
        await this.get(page).waitFor({ state: 'visible', timeout: (timeoutSec * 1000) });
    }

    async waitForAttached(page: Page | Frame, timeoutSec: number = 10) {
        this.log.debug(`[${this.locator}] waitForAttached(${timeoutSec})`)
        await this.get(page).waitFor({ state: 'attached', timeout: (timeoutSec * 1000) });
    }

    async waitForDetached(page: Page | Frame, timeoutSec: number = 10) {
        this.log.debug(`[${this.locator}] waitForDetached(${timeoutSec})`)
        await this.get(page).waitFor({ state: 'detached', timeout: (timeoutSec * 1000) });
    }

    async click(page: Page | Frame) {
        this.log.debug(`[${this.locator}] click`)
        await this.get(page).click();
    }

    async clear(page: Page | Frame) {
        this.log.debug(`[${this.locator}] clear`)
        await this.get(page).clear();
    }

    async fill(page: Page | Frame, text: string) {
        this.log.debug(`[${this.locator}] fill(${text})`)
        await this.get(page).clear();
        await this.get(page).fill(text);
    }

    async setOption(page: Page | Frame, options: string|ReadonlyArray<string>) {
        this.log.debug(`[${this.locator}] setOption(${options})`)
        await this.get(page).selectOption(options);
    }

}