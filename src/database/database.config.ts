import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrations: string[];
  synchronize: boolean;
  migrationsRun: boolean;
  logging: boolean;
}

export const getDatabaseConfig = (
  configService: ConfigService
): DatabaseConfig => {
  const host = configService.get<string>("DB_HOST");
  const port = configService.get<number>("DB_PORT");
  const username = configService.get<string>("DB_USERNAME");
  const password = configService.get<string>("DB_PASSWORD");
  const database = configService.get<string>("DB_DATABASE");

  if (!host || !port || !username || !database) {
    throw new Error("Missing required database configuration");
  }

  return {
    host,
    port: Number(port),
    username,
    password: password || "", // Allow empty password for local development
    database,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: true,
    logging: configService.get<string>("NODE_ENV") === "development",
  };
};

// Create and export the DataSource instance for migrations
const configService = new ConfigService();
const config = getDatabaseConfig(configService);

export default new DataSource({
  type: "mysql",
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: config.logging,
});
