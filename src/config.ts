import path from "path";
import dotenv from "dotenv";
import process from "process";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  NODE_ENV?: string;
  PORT?: number;
  SERVER_FINGERKEY?: string;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  SERVER_FINGERKEY: string;
}

export const DEFAULT_SERVER_PORT = 3000;
export const DEFAULT_SERVER_FINGERKEY = '';
export const DEFAULT_ENV = 'development';

// Loading process.env as ENV interface

const getConfig = (): Config => {
  return {
    NODE_ENV: process.env.NODE_ENV ?? DEFAULT_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT  ) : DEFAULT_SERVER_PORT,
    SERVER_FINGERKEY: process.env.SERVER_FINGERKEY ? process.env.SERVER_FINGERKEY  : DEFAULT_SERVER_FINGERKEY,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
