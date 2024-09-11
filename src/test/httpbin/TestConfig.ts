
export class TestConfig {

    readonly env: string;
    private readonly envConfigs: any;

    static instance: TestConfig = new TestConfig(process.env.npm_config_ENV == undefined ? 'dev' : process.env.npm_config_ENV);

    private devEnv = {
        web: { baseUrl: 'TBD' },
        api: { baseUrl: 'https://httpbin.org' },
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