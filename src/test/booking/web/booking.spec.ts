import { LandingPage } from '../../../project/booking/web/pages/landingPage';
import { SearchResultsPage } from '../../../project/booking/web/pages/searchResultsPage';
import { test, expect } from '@playwright/test';
import { TestConfig } from '../testConfig';

test.use({
    baseURL: TestConfig.instance.getWebBaseUrl(),
    locale: 'en-Gb',
});


test.describe('Booking.com search appartments', () => {

    test('Simple search query', async ({ page }) => {
        let landingPage = new LandingPage(page);
        await landingPage.navigate();
        expect(await landingPage.isLoaded()).toBeTruthy();
    
        let searchQuery = {
            where: 'London',
            when: {
                from: { day: 7, month: 'next' },
                to: { day: 21, month: 'next' },
            }
        }
    
        await landingPage.doSearch(searchQuery);
    
        let searchResultsPage = new SearchResultsPage(page);
        expect(await searchResultsPage.isLoaded()).toBeTruthy();
        expect(await searchResultsPage.getSearchResultCardsCount()).toBeGreaterThanOrEqual(25);
        expect(await searchResultsPage.getAssertiveHeaderText()).toMatch(new RegExp(`${searchQuery.where}: \\d,\\d+ properties found`));
    });
    
    
    test('Complex search query', async ({ page }) => {
        let landingPage = new LandingPage(page);
        await landingPage.navigate();
        expect(await landingPage.isLoaded()).toBeTruthy();
        let searchQuery = {
            where: 'Iceland',
            when: {
                from: { day: new Date().getDate(), month: 'current' },
                to: { day: 15, month: 'next' },
                flexibility: '7'
            },
            occupancy: {
                adults: 1,
                children: [0, 7, 17],
                rooms: 2,
                pets: true
            }
        }
    
        await landingPage.doSearch(searchQuery);
    
        let searchResultsPage = new SearchResultsPage(page);
        expect(await searchResultsPage.isLoaded()).toBeTruthy();
        expect(await searchResultsPage.getSearchResultCardsCount()).toBeLessThan(10);
        expect(await searchResultsPage.getAssertiveHeaderText()).toMatch(new RegExp(`${searchQuery.where}: \\d properties found`));
    
        let searchQuery2 = {
            occupancy: {
                pets: false
            }
        }
        await searchResultsPage.doSearch(searchQuery2);
        expect(await searchResultsPage.getSearchResultCardsCount()).toBeGreaterThan(10);
        expect(await searchResultsPage.getAssertiveHeaderText()).toMatch(new RegExp(`${searchQuery.where}: \\d+ properties found`));
    });

});


test.describe('Booking.com language detection by browser locale', () => {

    test.use({ locale: 'fr-FR' });

    test('should redirect to the target location index page', async ({ page }) => {
        await page.goto('/')
        expect(page.url()).toContain('/index.fr.html');
    });

});


