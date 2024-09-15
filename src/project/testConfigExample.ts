import { Mysql2DbUtils } from "../core/db/mysql2DbUtils";
import { ImapMailUtils } from "../core/mail/imapMailUtils";
import { Logger, ILogObj } from 'tslog';

export class TestConfig {

    readonly env: string;
    private readonly envConfigs: any;
    private mailUtils: ImapMailUtils;
    private dbUtils: Mysql2DbUtils;
    private log: Logger<ILogObj> = new Logger();

    static instance: TestConfig = new TestConfig(process.env.npm_config_ENV == undefined ? 'dev' : process.env.npm_config_ENV);

    private baseConfigs = {
        mail: {
            imapHost: '',
            imapPort: '',
            user: '',
            password: ''
        }
    }

    private devEnv = {
        web: { baseUrl: '' },
        api: { baseUrl: '' },
        db: {
            host: '',
            dbName: '',
            user: '',
            password: '',
        },
        mail: this.baseConfigs.mail
    }

    private qaEnv = {
        web: { baseUrl: '' },
        api: { baseUrl: '' },
        db: {
            host: '',
            dbName: '',
            user: '',
            password: '',
        },
        mail: this.baseConfigs.mail
    }

    private stageEnv = {
        web: { baseUrl: '' },
        api: { baseUrl: '' },
        db: {
            host: '',
            dbName: '',
            user: '',
            password: '',
        },
        mail: this.baseConfigs.mail
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
        this.log.info(`[TestConfig] env: ${env}, envConfigs: ${JSON.stringify(this.envConfigs)}`);

        this.mailUtils = ImapMailUtils.build(
            this.envConfigs.mail.imapHost,
            this.envConfigs.mail.imapPort,
            this.envConfigs.mail.user,
            this.envConfigs.mail.password,
        );
        this.dbUtils = Mysql2DbUtils.build(
            this.envConfigs.db.host,
            this.envConfigs.db.dbName,
            this.envConfigs.db.user,
            this.envConfigs.db.password,
        );
    }

    getWebBaseUrl(): string {
        return this.envConfigs.web.baseUrl;
    }

    getApiBaseUrl(): string {
        return this.envConfigs.api.baseUrl;
    }

    getMailUtils(): ImapMailUtils {
        return this.mailUtils;
    }

    getDbUtils(): Mysql2DbUtils {
        return this.dbUtils;
    }
}