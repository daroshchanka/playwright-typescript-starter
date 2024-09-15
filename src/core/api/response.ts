import { APIResponse } from "@playwright/test";
import { Serializable } from "./requestOptions";
import { ILogObj, Logger } from "tslog";

export class Response {

    readonly responseStatus: number;
    readonly responseHeaders: { [key: string]: string; };
    readonly responseText: string;
    readonly responseBody: Buffer;
    private log: Logger<ILogObj> = new Logger();


    private constructor(status: number, headers: { [key: string]: string; }, text: string, body: Buffer) {
        this.responseStatus = status;
        this.responseHeaders = headers;
        this.responseText = text;
        this.responseBody = body;
    }

    static async create(playwrightResponse: APIResponse) {
        let status = playwrightResponse.status();
        let headers = playwrightResponse.headers();
        let text = await playwrightResponse.text();
        let body = await playwrightResponse.body();
        playwrightResponse.dispose();
        return new Response(status, headers, text, body);
    }

    json(): Serializable {
        let json = JSON.parse(this.responseText);
        this.log.debug(`JSON: ${JSON.stringify(json)}`)
        return json;
    }

    status(): number {
        return this.responseStatus;
    }

    text(): string {
        return this.responseText;
    }

    body(): Buffer {
        return this.responseBody;
    }

}