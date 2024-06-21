/** @format */

import { Sequelize } from "sequelize";

class Database extends Sequelize {
	private static instance: Sequelize;

	private constructor(host: string, user: string, password: string, database: string, port?: number, logging?: boolean) {
		super(database, user, password, {
			host: host,
			dialect: "mariadb",
			port: port || 3306,
			logging: logging || false,
		});
	}

	public static getInstance(host: string, user: string, password: string, database: string, port?: number, logging?: boolean): Sequelize {
		if (!Database.instance) {
			this.instance = new Database(host, user, password, database, port, logging);
		}

		return Database.instance;
	}
}

export default Database;
