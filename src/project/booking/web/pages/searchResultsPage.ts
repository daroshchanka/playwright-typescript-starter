import { Page } from 'playwright/test';
import { BaseWebPage } from '../../../../core/web/baseWebPage'
import { UiElement } from '../../../../core/web/uiElement'
import { TopHeaderWidget } from './widgets/topHeaderWidget';
import { SearchWidget } from './widgets/searchWidget';

export class SearchResultsPage extends BaseWebPage {

    private assertiveHeader = UiElement.byXpath("//h1[@aria-live='assertive']");
    private mapTrigger = UiElement.byTestId('map-trigger');
    private searchResultItem = UiElement.byTestId('property-card');
    readonly topHeader: TopHeaderWidget;
    readonly search: SearchWidget;

    constructor(page: Page) {
        super(page);
        this.topHeader = new TopHeaderWidget(page);
        this.search = new SearchWidget(page);
    }

    async isLoaded(): Promise<boolean> {
        let result = await this.assertiveHeader.isVisible(this.page) &&
            await this.mapTrigger.isVisible(this.page);
        this.log.info(`Check SearchResults page is loaded - ${result}`);
        return result;
    }

    async getAssertiveHeaderText(): Promise<string | null> {
        let result = await this.assertiveHeader.getText(this.page);
        this.log.info(`Get assertive header text - ${result}`);
        return result;
    }

    async getSearchResultCardsCount(): Promise<number>{
        let result = (await this.searchResultItem.getList(this.page)).length;
        this.log.info(`Get search results visible cards count - ${result}`);
        return result;
    }

    async doSearch(query) {
        await this.search.doSearch(query);
    }

}