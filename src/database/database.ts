/** @format */

import { Dialect, Sequelize } from "sequelize";
import { Logger } from "winston";
import log from "../logger";

class Database extends Sequelize {
	private static instance: Sequelize;
	private static dialect: Dialect;

	public constructor(host: string, user: string, password: string, database: string, port?: number, logging?: boolean | ((msg: any) => Logger)) {
		if (!Database.dialect) throw new Error("Dialect not set");

		super(database, user, password, {
			host: host,
			dialect: Database.dialect,
			port: port || 3306,
			logging: logging || false,
		});
	}

	static getInstance(): Sequelize;
	static getInstance(host?: string, user?: string, password?: string, database?: string): Sequelize;
	static getInstance(host?: string, user?: string, password?: string, database?: string, port?: number, logging?: any): Sequelize;
	static getInstance(host?: string, user?: string, password?: string, database?: string, port?: number, logging?: any): Sequelize {
		if (!Database.instance) {
			Database.instance = new Database(host, user, password, database, port, logging);
		}

		return Database.instance;
	}

	static setDialect(dialect: string): void {
		this.dialect = dialect as Dialect;
	}
}

export default Database;
