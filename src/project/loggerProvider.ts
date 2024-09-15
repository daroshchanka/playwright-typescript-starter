import { ILogObj, Logger } from "tslog";


export class LoggerProvider {

    static readonly logger:Logger<ILogObj> = new Logger();
    
}