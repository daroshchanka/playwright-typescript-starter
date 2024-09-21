import { Page } from 'playwright/test';
import { BaseWebPage } from '../../../../core/web/baseWebPage'
import { UiElement } from '../../../../core/web/uiElement'
import { TopHeaderWidget } from './widgets/topHeaderWidget';
import { SearchWidget } from './widgets/searchWidget';

export class LandingPage extends BaseWebPage {

    private heroBanner = UiElement.byXpath("//div[contains(@class, 'hero-banner')]");
    private promoSection = UiElement.byXpath("//div[contains(@class, 'promo-section')]");
    private registerPopup = UiElement.byXpath("//div[@role='dialog']");
    private registerPopupCloseIcon = UiElement.byXpath(`${this.registerPopup.locator}//button`);
    readonly topHeader: TopHeaderWidget;
    readonly search: SearchWidget;

    constructor(page: Page) {
        super(page);
        this.topHeader = new TopHeaderWidget(page);
        this.search = new SearchWidget(page);
    }

    async navigate() {
        this.log.info('Navigate to Landing page');
        await this.page.goto('/');
        await this.handleRegisterPopup();
        await this.waitForNetworkIdle();
    }

    async isLoaded(): Promise<boolean> {
        let result = await this.heroBanner.isVisible(this.page) &&
        await this.promoSection.isVisible(this.page)
        this.log.info(`Check Landing page is loaded - ${result}`)
        return result;
    }

    async doSearch(query) {
        await this.search.doSearch(query);
    }

    private async handleRegisterPopup() {
        try {
            await this.registerPopup.waitForAttached(this.page, 2);
            if (await this.registerPopup.isVisible(this.page)) {
                this.log.debug('Closing register/signon popup');
                await this.registerPopupCloseIcon.click(this.page);
                await this.registerPopup.waitForDetached(this.page);
            }
        } catch (ignored) {
        }
    }
}