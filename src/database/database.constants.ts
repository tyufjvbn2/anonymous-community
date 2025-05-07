export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const DATABASE_CONFIG = {
  TYPE: 'mysql',
  SYNCHRONIZE: false,
  MIGRATIONS_RUN: true,
  ENTITIES_PATH: 'dist/**/*.entity{.ts,.js}',
  MIGRATIONS_PATH: 'dist/database/migrations/*{.ts,.js}',
} as const; 