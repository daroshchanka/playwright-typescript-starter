import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestOptions } from "./requestOptions";
import { Response } from "./response";
import { ILogObj, Logger } from "tslog";

export class HttpClient {

    readonly apiRequest: APIRequestContext;
    private log: Logger<ILogObj> = new Logger();

    constructor(context: APIRequestContext) {
        this.apiRequest = context;
    }

    async dispose() {
        await this.apiRequest.dispose();
    }

    async delete(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('delete', url, options);
    }

    async get(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('get', url, options);
    }

    async head(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('head', url, options);
    }

    async post(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('post', url, options);
    }

    async put(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('put', url, options);
    }

    async patch(url: string, options?: RequestOptions): Promise<Response> {
        return await this.doRequest('patch', url, options);
    }

    private async doRequest(method: string, url: string, options?: RequestOptions) {
        let opt: RequestOptions = Object.assign(new RequestOptions(), options)
        this.log.debug(`${method.toUpperCase()} ${url} --> \n${options}`)
        let playwrightResponse = await this.apiRequest.fetch(url, opt?.withMethod(method));
        let result = await Response.create(playwrightResponse);
        this.log.debug(`<-- ${method.toUpperCase()} ${url} - ${result.status()}`)
        return result;
    }

}