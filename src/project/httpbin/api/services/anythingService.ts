import { RequestOptions, Serializable } from "../../../../core/api/requestOptions";
import { Response } from "../../../../core/api/response";
import { AnythingDto } from "../../utils/data/anythingDto";
import { BaseApiService } from "../../../../core/api/baseApiService";

export class AnythingService extends BaseApiService {

    private resources = {
        get: `${this.baseUrl}/anything`,
        post: `${this.baseUrl}/anything`,
        put: `${this.baseUrl}/anything`,
        delete: `${this.baseUrl}/anything`,
    }

    async getAnything(params?: { [key: string]: string | number | boolean }): Promise<Response> {
        this.log.info('Get anything')
        return await this.httpClient.get(this.resources.get, { params: params } as RequestOptions);
    }

    async deleteAnything(ids: Array<number>): Promise<Response> {
        this.log.info('Delete anything')
        return await this.httpClient.delete(this.resources.delete, { data: { ids: ids } } as RequestOptions);
    }

    async putAnything(id: number, data: AnythingDto): Promise<Response> {
        this.log.info('Put anything')
        let options = new RequestOptions();
        options.data = data;
        options.headers = { id: id.toString() };
        return await this.httpClient.put(this.resources.put, options);
    }

    async postAnything(data: AnythingDto): Promise<Response> {
        this.log.info('Post anything')
        return await this.httpClient.post(this.resources.post, { data: data } as RequestOptions);
    }

}