import { AnythingDto } from '../../../project/httpbin/utils/data/anythingDto';
import { AnythingGenerator } from '../../../project/httpbin/utils/data/generators/anythingGenerator';
import { test, expect } from '@playwright/test'
import { HttpbinTestConfig } from '../httpbinTestConfig';
import { AnythingService } from '../../../project/httpbin/api/services/anythingService';

test.use({
    baseURL: HttpbinTestConfig.instance.getApiBaseUrl(),
});

test.describe('httpbin.org Anything Api group', () => {

    test('GET /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let query = { ids: '1,2,3', enabled: true };
        let response = await apiService.getAnything(query);

        expect(response.status()).toBe(200);
        let json = response.json();
        expect(json.args.ids).toEqual(query.ids);
        expect(json.args.enabled).toEqual(query.enabled.toString());
    });


    test('POST /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let input: AnythingDto = AnythingGenerator.generate();
        let response = await apiService.postAnything(input);

        expect(response.status()).toEqual(200);
        let jsonData = JSON.parse(response.json().data) as AnythingDto;
        expect(jsonData.keyString).toEqual(input.keyString);
        expect(jsonData.keyBoolean).toEqual(input.keyBoolean);
        expect(jsonData.keyNumber).toEqual(input.keyNumber);
        expect(jsonData.keyArrayString).toEqual(input.keyArrayString);
        expect(jsonData.keyArrayObj).toEqual(input.keyArrayObj);
    });

    test('PUT /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let input: AnythingDto = AnythingGenerator.generate();
        let id = 100000;
        let response = await apiService.putAnything(id, input);

        expect(response.status()).toEqual(200);
        let json = response.json()
        let jsonData = JSON.parse(json.data) as AnythingDto;
        expect(jsonData.keyString).toEqual(input.keyString);
        expect(jsonData.keyBoolean).toEqual(input.keyBoolean);
        expect(jsonData.keyNumber).toEqual(input.keyNumber);
        expect(jsonData.keyArrayString).toEqual(input.keyArrayString);
        expect(jsonData.keyArrayObj).toEqual(input.keyArrayObj);
        expect(json.headers.Id).toEqual(id.toString());
    });


    test('DELETE /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let ids = [10000, 999912, 234234]
        let response = await apiService.deleteAnything(ids);

        expect(response.status()).toEqual(200);
        let jsonData = JSON.parse(response.json().data)
        expect(jsonData.ids).toEqual(ids);
    });

});