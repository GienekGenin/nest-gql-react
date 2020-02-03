import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private mod = process.env.NODE_ENV;
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('SERVER_PORT', true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT'), 0),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),

      entities: ['dist/entities/**/*.entity{.ts,.js}'],

      dropSchema: this.mod === 'development',
      synchronize: this.mod === 'development',

      migrationsTableName: 'migration',

      migrations: ['dist/migration/*.js'],

      cli: {
        migrationsDir: 'src/migration',
      },
      subscribers: ['dist/entities/**/*.subscriber{.ts,.js}'],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_PORT',
  'DB_HOST',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };
