import { BaseWebPage } from '../../../../../core/web/baseWebPage'
import { UiElement } from '../../../../../core/web/uiElement'

export class SearchWidget extends BaseWebPage {

    private searchSubmitButton = UiElement.byXpath("//div[(contains(@class, 'hero-banner-searchbox')) or " +
        "(@data-testid='searchbox-layout-wide')]//button[@type='submit']")
    private destinationContainer = UiElement.byTestId('destination-container');
    private destinationInput = UiElement.byXpath(`${this.destinationContainer.locator}//input`);
    private getDestinationAutocompleteResult(number: number): UiElement {
        return UiElement.byXpath(`(//li[contains(@id, 'autocomplete-result-')])[${number}]`);
    }

    private datesContainer = UiElement.byTestId('searchbox-dates-container');
    private datesContainerButton = UiElement.byXpath(`${this.datesContainer.locator}//button`);
    private datesContainerCalendar = UiElement.byId('calendar-searchboxdatepicker');
    private getDatesContainerCalendarMonth(number: number): UiElement {
        return UiElement.byXpath(`(${this.datesContainerCalendar.locator}//table)[${number}]`);
    }
    private getDatepickerDay(dayNumber: number, calendarMonth: number): UiElement {
        return UiElement.byXpath(`(${this.getDatesContainerCalendarMonth(calendarMonth).locator}//td[@role='gridcell']/span)[${dayNumber}]`);
    }
    private getFlexibleDaysOption(option: string | number): UiElement {
        return UiElement.byXpath(`//*[@data-testid="flexible-dates-container"]//input[@value=${option}]/..`);
    }

    private occupancyConfigButton = UiElement.byTestId('occupancy-config');
    private occupancyConfigPopup = UiElement.byTestId('occupancy-popup');
    private occupancyConfigPopupDoneButton = UiElement.byXpath(`${this.occupancyConfigPopup.locator}/button`);
    private occupancyConfigAdultsInput = UiElement.byId('group_adults');
    private occupancyConfigAdultsDecrementIcon = UiElement.byXpath(`${this.occupancyConfigAdultsInput.locator}/..//button[1]`);
    private occupancyConfigAdultsIncrementIcon = UiElement.byXpath(`${this.occupancyConfigAdultsInput.locator}/..//button[2]`);
    private occupancyConfigChildrenInput = UiElement.byId('group_children');
    private occupancyConfigChildrenDecrementIcon = UiElement.byXpath(`${this.occupancyConfigChildrenInput.locator}/..//button[1]`);
    private occupancyConfigChildrenIncrementIcon = UiElement.byXpath(`${this.occupancyConfigChildrenInput.locator}/..//button[2]`);
    private getOccupancyConfigChildAgeDropdown(number: number): UiElement {
        return UiElement.byXpath(`(//select[@name='age'])[${number}]`);
    }
    private occupancyConfigRoomsInput = UiElement.byId('no_rooms');
    private occupancyConfigRoomsDecrementIcon = UiElement.byXpath(`${this.occupancyConfigRoomsInput.locator}/..//button[1]`);
    private occupancyConfigRoomsIncrementIcon = UiElement.byXpath(`${this.occupancyConfigRoomsInput.locator}/..//button[2]`);
    private occupancyPetsCheckboxHidden = UiElement.byXpath("//input[@type='checkbox'][@name='pets']");
    private occupancyPetsCheckboxSwitcher = UiElement.byXpath("//label[@for='pets']//span[1]");


    async isLoaded(): Promise<boolean> {
        return await this.destinationContainer.isVisible(this.page);
    }


    async doSearch(query) {
        this.log.info(`Do search ${JSON.stringify(query)}`);
        if (query.where) {
            await this.fillWhere(query.where);
        }
        if (query.when) {
            await this.fillWhen(query.when);
        }
        if (query.occupancy) {
            await this.fillOccupancy(query.occupancy);
        }
        await this.searchSubmitButton.click(this.page);
        await this.waitForNetworkIdle();
    }

    private async fillWhere(where) {
        await this.destinationContainer.click(this.page);
        await this.destinationInput.fill(this.page, where);
        await this.pause(500);
        await this.getDestinationAutocompleteResult(1).click(this.page);
    }

    private async fillWhen(when) {
        if (!await this.datesContainerButton.isVisible(this.page)) {
            await this.datesContainerButton.click(this.page);
        }
        if (when.flexibility) {
            await this.getFlexibleDaysOption(when.flexibility).click(this.page);
        }
        let fromMonth = when.from.month == 'next' ? 2 : 1;
        await this.getDatepickerDay(when.from.day, fromMonth).click(this.page);

        let toMonth = when.to.month == 'next' ? 2 : 1;
        await this.getDatepickerDay(when.to.day, toMonth).click(this.page);
    }

    private async fillOccupancy(occupancy) {
        if (!await this.occupancyConfigPopup.isVisible(this.page)) {
            await this.occupancyConfigButton.click(this.page);
        }
        await this.adjustValueForOccupancy(
            occupancy.adults, this.occupancyConfigAdultsInput, this.occupancyConfigAdultsDecrementIcon, this.occupancyConfigAdultsIncrementIcon
        );
        if (occupancy.children) {
            let childrenCount = (occupancy.children as any[]).length;
            this.log.debug(`Children count - ${childrenCount}`)
            this.log.debug(`Children - ${JSON.stringify(occupancy.children)}`)

            await this.adjustValueForOccupancy(
                childrenCount, this.occupancyConfigChildrenInput, this.occupancyConfigChildrenDecrementIcon, this.occupancyConfigChildrenIncrementIcon
            );

            for (let i = 0; i < childrenCount; i++) {
                await this.getOccupancyConfigChildAgeDropdown(i + 1).setOption(this.page, occupancy.children[i].toString());
            }
        }
        await this.adjustValueForOccupancy(
            occupancy.rooms, this.occupancyConfigRoomsInput, this.occupancyConfigRoomsDecrementIcon, this.occupancyConfigRoomsIncrementIcon
        );

        if (occupancy.pets == true) {
            if (!await this.occupancyPetsCheckboxHidden.isChecked(this.page)) {
                await this.occupancyPetsCheckboxSwitcher.click(this.page,);
            }
        } else if (occupancy.pets == false) {
            if (await this.occupancyPetsCheckboxHidden.isChecked(this.page)) {
                await this.occupancyPetsCheckboxSwitcher.click(this.page,);
            }
        }

        await this.occupancyConfigPopupDoneButton.click(this.page);
    }

    private async adjustValueForOccupancy(targetValue: number | undefined, input: UiElement, decrement: UiElement, increment: UiElement) {
        if (targetValue) {
            let currentValue = parseInt((await input?.getAttribute(this.page, 'value'))!);
            let valueDelta = targetValue - currentValue;
            let changeValueIcon = valueDelta > 0 ? increment : decrement;
            this.log.debug(`Set [${input.locator}] value ${currentValue} -> ${targetValue}`)
            for (let i = Math.abs(valueDelta); i--;) {
                await changeValueIcon.click(this.page);
            }
        }
    }
}