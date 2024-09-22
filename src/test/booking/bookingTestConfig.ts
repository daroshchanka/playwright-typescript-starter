
export class BookingTestConfig {

    readonly env: string;
    private readonly envConfigs: any;

    static instance: BookingTestConfig = new BookingTestConfig(process.env.npm_config_ENV == undefined ? 'dev' : process.env.npm_config_ENV);

    private devEnv = {
        web: { baseUrl: 'https://www.booking.com' },
        api: { baseUrl: 'TBD' },
    }

    private qaEnv = {
        web: { baseUrl: 'TBD' },
        api: { baseUrl: 'TBD' },
    }

    private stageEnv = {
        web: { baseUrl: 'TBD' },
        api: { baseUrl: 'TBD' },
    }

    private constructor(env: string) {
        this.env = (env == undefined ? 'dev' : env).toLocaleLowerCase();;
        switch (env) {
            case 'qa': {
                this.envConfigs = this.qaEnv;
                break;
            }
            case 'stage': {
                this.envConfigs = this.stageEnv;
                break;
            }
            default: {
                this.envConfigs = this.devEnv;
                break;
            }
        }
    }

    getWebBaseUrl(): string {
        return this.envConfigs.web.baseUrl;
    }

    getApiBaseUrl(): string {
        return this.envConfigs.api.baseUrl;
    }
}