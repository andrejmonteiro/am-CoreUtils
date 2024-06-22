# andrejmonteiro/core-utils
### This package is meant to be used as a "submodule" for other projects. It includes logging service for console, database service with support for MariaDB, MySQL, MSSLQ, Postgres and SQLite. Also a planned Seq feature.

✅ – Console logger.
✅ – Database connector (Sequelize)
⬜ – Seq logger (web).

## Instalation
    npm i @andrejmonteiro/core-utils [mariadb | mssql | mysql | postgres | sqlite]

## Code examples
### Database connection with logger support
    // Index.ts
    import { database, logger as log } from "@andrejmonteiro/core-utils";
    
    // Set the prefered dialect
	database.setDialect("mariadb");
    // port and logging are optional fields they default to 3306 and false, respectively.
	let instance = database.getInstance("host", "user", "password", "database", "port", "logging");
	
	try {
		(async () => {
			await  instance
			.authenticate()
			.then(() =>  log.info("Connection with the database has been established successfully."))
			.catch((err:  any) => {
				throw  new  Error(err);
			});
		});
	} catch (err) {
		log.error(`Error on file ${__filename}: ${err.message}`);
	}

After testing a successful connection to the database is ready to use and since the database is working with [Sequelize](https://sequelize.org/) you'll need to create Models that  match the database structure as shown bellow:

    // User.ts
	import { Model, DataTypes } from "sequelize";
	import { database, logger as log } from "@andrejmonteiro/core-utils";

	// Set the prefered dialect
	database.setDialect("mariadb");
	// Initialize the database
	let  db:  Sequelize  =  database.getInstance();
	
	export default class User extends Model {
		// You can set mandatory properties here
		// id!: number
		// username!: string
		// ...
	};
	
	User.init(
		{
			id: { type:  DataTypes.INTEGER, primaryKey:  true, autoIncrement:  true },
			username: { type:  DataTypes.INTEGER, allowNull: false},
			email: { type:  DataTypes.INTEGER, allowNull: false},
			password: { type:  DataTypes.INTEGER, allowNull: false},
		},
		{
			sequelize: db,
			modelName: "user",
			tableName: "user",
			timestamps: user,
		}
	);
	
Now all you need is to get the instance of the database and query it:
	
    import User from "./models/user.ts"
	import { database } from "@andrejmonteiro/core-utils";
    
    let  db:  Sequelize  =  database.getInstance();
	
	(async() => {
		let query: User[] = await User.findAll({ raw: true, mapToModel: true, instance: new User() });
		log.debug(query);
	});
	
