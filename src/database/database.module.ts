import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["dist/database/migrations/*{.ts,.js}"],
        synchronize: false,
        migrationsRun: true,
        logging: configService.get("NODE_ENV") === "development",
        extra: {
          connectionLimit: 10,
        },
        ssl: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
