import * as mysql from 'mysql2/promise';
import { Logger, ILogObj } from 'tslog';

export class Mysql2DbUtils {

  connectionOptions: mysql.ConnectionOptions = {};
  log: Logger<ILogObj> = new Logger();

  static build(host: string, dbName: string, user: string, password: string) : Mysql2DbUtils {
    const cls = new Mysql2DbUtils();
    cls.connectionOptions = {
      host     : host,
      database : dbName,
      user     : user,
      password : password,
    };
    return cls;
  }

  static buildFromOptions(connectionOptions: mysql.ConnectionOptions) : Mysql2DbUtils {
    const cls = new Mysql2DbUtils();
    cls.connectionOptions = connectionOptions;
    return cls;
  }

  async query(queryString: string): Promise<Array<any>> {
    this.log.debug(`DB query: ${queryString} - START`);
    const conn = await mysql.createConnection(this.connectionOptions);
    let rows: Array<any>
    try {
      await conn.connect();
      rows = (await conn.query(queryString))[0] as Array<any>;
    } finally {
      await conn.end();
    }
    this.log.debug(`DB query: ${queryString} - DONE`);
    return rows;
  }

  async execute(queryString: string): Promise<Array<any>> {
    this.log.debug(`DB execute: ${queryString} - START`);
    const conn = await mysql.createConnection(this.connectionOptions);
    let rows: Array<any>
    try {
      await conn.connect();
      rows = (await conn.execute(queryString))[0] as Array<any>;
    } finally {
      await conn.end();
    }
    this.log.debug(`DB execute: ${queryString} - DONE`);
    return rows;
  }

}

