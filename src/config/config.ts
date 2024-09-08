import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

interface DatabaseConfig {
  database: string;
}

interface Config {
  http: {
    port: number;
    host: string;
  };
  db: Record<string, DatabaseConfig>;
  jwt: {
    secret: string;
  };
}

const YAML_CONFIG_FILENAME = "config.yaml";

export default (): Config => {
  return yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8")) as Config;
};
