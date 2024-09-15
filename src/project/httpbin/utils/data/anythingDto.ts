import { Serializable } from "../../../../core/api/requestOptions";

export class AnythingDto implements Serializable {

    keyString?: string
    keyBoolean?: boolean
    keyNumber?: number
    keyArrayString?: Array<string>
    keyArrayObj?: Array<{ [key: string]: string | number | boolean }>

}