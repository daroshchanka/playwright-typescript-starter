import { APIRequestContext } from "playwright/test";
import { HttpClient } from "./httpClient";
import { ILogObj, Logger } from "tslog";

export class BaseApiService {

    protected baseUrl: string;
    protected readonly httpClient: HttpClient;
    protected log: Logger<ILogObj> = new Logger();

    constructor(request: APIRequestContext, baseUrl: string = '') {
        this.httpClient = new HttpClient(request);
        this.baseUrl = baseUrl;
    }

}