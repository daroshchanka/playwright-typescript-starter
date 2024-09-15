
import { ReadStream } from 'fs';
export type Serializable = any;

export class RequestOptions {
    method?: string;
    data?: string | Buffer | Serializable;
    failOnStatusCode?: boolean;
    form?: { [key: string]: string | number | boolean; };
    headers?: { [key: string]: string; };
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    multipart?: {
        [key: string]: string | number | boolean | ReadStream | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        };
    };
    params?: { [key: string]: string | number | boolean; };
    timeout?: number;

    public withMethod(method:string): RequestOptions {
        this.method = method;
        return this;
    }

    toString() {
        return JSON.stringify(this);
    }
}