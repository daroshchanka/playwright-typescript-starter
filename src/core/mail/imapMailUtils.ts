import { ImapFlow, ImapFlowOptions } from 'imapflow';
import { waitUntil } from 'async-wait-until';
import { Logger, ILogObj } from 'tslog'

export class ImapMailUtils {

  client: ImapFlow|undefined;
  options: ImapFlowOptions = { host: 'tbd', port: 0, auth: {user: 'tbd', pass: 'tbd'} };
  log: Logger<ILogObj> = new Logger();

  constructor() {
    this.client = undefined;
  }

  static build(imapHost: string, imapPort: number, user: string, password: string) : ImapMailUtils {
    const cls = new ImapMailUtils();
    cls.options = {
        host: imapHost,
        port: imapPort,
        secure: true,
        auth: {
            user: user,
            pass: password
        }
      };
    return cls;
  }

  static buildFromOptions(options: ImapFlowOptions) : ImapMailUtils {
    const cls = new ImapMailUtils();
    cls.options = options;
    return cls;
  }


  async waitForMail(to: string, timeoutSec: number = 300): Promise<string> {
    let result: string | PromiseLike<string> | null | undefined;
    this.log.debug(`Wait for mail ${to}, timeoutSec: ${timeoutSec}`)
    await waitUntil(async () =>
        {
            this.client = new ImapFlow(this.options);
            await this.client.connect();
            let lock = await this.client.getMailboxLock('INBOX');
            try {
                for await (let message of this.client.fetch(
                    { to: to} ,
                    { envelope: true, source: true },
                    { uid: true, changedSince: BigInt(0) }
                )) {
                    result = `${message.source}`;
                    console.log(`waitForMail.result: ${result}`)
                }
            } finally {
                await this.client.messageDelete({to: to});
                lock.release();
            }
            await this.client.logout();
            if(result === undefined) {
                return false;
            }
            if(result === null) {
                return false;
            }
            return true;
        }, 
    {
        timeout: timeoutSec*1000,
        intervalBetweenAttempts: 30*1000
    });
    if(result === undefined) {
        result = 'initial'
    }
    if(result === null) {
        result = 'initial'
    }
    return result;
  }

}