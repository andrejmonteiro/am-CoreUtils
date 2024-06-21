import { Sequelize } from "sequelize";

class Database extends Sequelize {
    private static instance: Sequelize;

    private constructor(host: string, user: string, password: string, database: string, port: number) {
        super(database, user, password, {
            host: host,
            dialect: "mariadb",
            port: port || 3306,
        });
    }

    public static getInstance(host: string, user: string, password: string, database: string, port: number): Sequelize {
        if (!Database.instance) {
            this.instance = new Database(host, user, password, database, port);
        }

        return Database.instance;
    }
}

export default Database;