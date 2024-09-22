import { BaseWebPage } from "../../../../../core/web/baseWebPage";
import { UiElement } from "../../../../../core/web/uiElement";

export class TopHeaderWidget extends BaseWebPage {

    private headerLogo = UiElement.byTestId('header-logo');
    private userCurrencyPickerIcon = UiElement.byTestId('header-currency-picker-trigger');
    private userCurrency = UiElement.byXpath(`${this.userCurrencyPickerIcon.locator}//span`);
    private userLanguagePickerIcon = UiElement.byTestId('header-language-picker-trigger');
    private signUpButton = UiElement.byTestId('header-sign-up-button');
    private signInButton = UiElement.byTestId('header-sign-in-button');
    private navigationMenu = UiElement.byTestId('header-xpb');
    private navigationMenuAccommodations = UiElement.byXpath(`${this.userCurrencyPickerIcon.locator}//a[@id='accommodations']`);
    private navigationMenuFlights = UiElement.byXpath(`${this.userCurrencyPickerIcon.locator}//a[@id='flights']`);
    private navigationMenuAttractions = UiElement.byXpath(`${this.userCurrencyPickerIcon.locator}//a[@id='attractions']`);
    private navigationMenuAirportTaxis = UiElement.byXpath(`${this.userCurrencyPickerIcon.locator}//a[@id='airport_taxis']`);

    async isLoaded(): Promise<boolean> {
        return (
            await this.headerLogo.isVisible(this.page) &&
            await this.userLanguagePickerIcon.isVisible(this.page) &&
            await this.navigationMenuAccommodations.isVisible(this.page)
        )
    }

}

