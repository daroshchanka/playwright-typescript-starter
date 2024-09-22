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

    private mobileViewHeaderMenu = UiElement.byTestId('header-mobile-menu-button');
    private mobileViewMenuDrawer = UiElement.byTestId('header-mobile-menu-modal');
    private mobileViewMenuDrawerCloseButton = UiElement.byTestId('header-mobile-menu-modal-close');
    private mobileViewMenuCareersItem = UiElement.byXpath(`${this.mobileViewMenuDrawer.locator}//a[contains(@href, 'https://careers.booking.com')]`);

    constructor(page: Page) {
        super(page);
        this.topHeader = new TopHeaderWidget(page);
        this.search = new SearchWidget(page);
    }

    async navigate() {
        this.log.info('Navigate to Landing page');
        await this.page.goto('/');
        await this.handleRegisterPopup();
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
        await this.waitForNetworkIdle();
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

    async isMobileViewLoaded(): Promise<boolean> {
        let result = await this.mobileViewHeaderMenu.isVisible(this.page)
        this.log.info(`Check is Landing page Mobile view loaded - ${result}`)
        return result;
    }

    async openMobileMenu() {
        this.log.info(`Open mobile view top menu`)
        await this.mobileViewHeaderMenu.click(this.page);
        await this.pause(500);
    }

    async isMobileMenuOpened(): Promise<boolean> {
        let result = await this.mobileViewMenuDrawer.isVisible(this.page)
        this.log.info(`Check is Mobile menu opened - ${result}`)
        return result;
    }

    async isMobileMenuCareersItemVisible(): Promise<boolean> {
        let result = await this.mobileViewMenuCareersItem.isVisible(this.page)
        this.log.info(`Check is Mobile menu Careers item visible - ${result}`)
        return result;
    }

    async closeMobileMenu() {
        this.log.info(`Close mobile view top menu`)
        await this.mobileViewMenuDrawerCloseButton.click(this.page);
        await this.mobileViewMenuDrawerCloseButton.waitForDetached(this.page);
    }
}