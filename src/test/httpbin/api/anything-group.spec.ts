import { AnythingService } from '../../../project/httpbin/api/services/AnythingService';
import { AnythingDto } from '../../../project/httpbin/utils/data/AnythingDto';
import { AnythingGeterator } from '../../../project/httpbin/utils/data/generators/AnythingGenerator';
import { test, expect } from '@playwright/test'
import { TestConfig } from '../TestConfig';


test.use({
    baseURL: TestConfig.instance.getApiBaseUrl(),
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
        let input: AnythingDto = AnythingGeterator.generate();
        let response = await apiService.postAnything(input);

        expect(response.status()).toEqual(200);
        let jsonDataOutput = JSON.parse(response.json().data) as AnythingDto;
        expect(jsonDataOutput.keyString).toEqual(input.keyString);
        expect(jsonDataOutput.keyBoolean).toEqual(input.keyBoolean);
        expect(jsonDataOutput.keyNumber).toEqual(input.keyNumber);
        expect(jsonDataOutput.keyArrayString).toEqual(input.keyArrayString);
        expect(jsonDataOutput.keyArrayObj).toEqual(input.keyArrayObj);
    });

    test('PUT /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let input: AnythingDto = AnythingGeterator.generate();
        let id = 100000;
        let response = await apiService.putAnything(id, input);

        expect(response.status()).toEqual(200);
        let responseJson = response.json()
        let jsonDataOutput = JSON.parse(responseJson.data) as AnythingDto;
        expect(jsonDataOutput.keyString).toEqual(input.keyString);
        expect(jsonDataOutput.keyBoolean).toEqual(input.keyBoolean);
        expect(jsonDataOutput.keyNumber).toEqual(input.keyNumber);
        expect(jsonDataOutput.keyArrayString).toEqual(input.keyArrayString);
        expect(jsonDataOutput.keyArrayObj).toEqual(input.keyArrayObj);
        expect(responseJson.headers.Id).toEqual(id.toString());
    });

    
    test('DELETE /anything', async ({ request }) => {
        let apiService = new AnythingService(request);
        let data = [10000, 999912, 234234]
        let response = await apiService.deleteAnything(data);

        expect(response.status()).toEqual(200);
        let jsonDataOutput = JSON.parse(response.json().data)
        expect(jsonDataOutput.ids).toEqual(data);
    });

});