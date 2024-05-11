/** @format */

import { TransformableInfo } from "logform";
import { Logger, createLogger, format, transports } from "winston";

const custom = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		verbose: 3,
		debug: 4,
		silly: 5,
	},
	colors: {
		error: "red",
		warn: "yellow",
		info: "cyan",
		verbose: "bue",
		debug: "green",
	},
};

export default createLogger({
	levels: custom.levels,
	transports: [
		new transports.Console({
			level: "debug",
			handleExceptions: true,
			format: format.combine(
				format.colorize({ all: true, colors: custom.colors }),
				format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss",
				}),
				format.printf((log: TransformableInfo) => `[${log.level}] ${[log.timestamp]}: ${log.message}`)
			),
		}),
	],
	exitOnError: false,
});
