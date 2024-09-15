import { APIRequestContext } from "playwright/test";
import { HttpClient } from "./httpClient";
import { ILogObj, Logger } from "tslog";

export class BaseApiService {

    protected readonly httpClient: HttpClient;
    protected log: Logger<ILogObj> = new Logger();

    constructor(request: APIRequestContext) {
        this.httpClient = new HttpClient(request);
    }

}