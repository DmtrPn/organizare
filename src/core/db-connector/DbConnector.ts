import { MikroORM, EntityRepository, AbstractNamingStrategy, NamingStrategy } from '@mikro-orm/core';
import { defineConfig, EntityManager } from '@mikro-orm/postgresql';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Config } from '@core/config/Config';
import { ConfigName, DbConfig } from '@core/config/types';
import { LoggerFactory } from '@components/logging/LoggerFactory';
import { isDefined } from '@utils/isDefined';

export class CustomSnakeNamingStrategy extends AbstractNamingStrategy implements NamingStrategy {
    classToTableName(entityName: string): string {
        return this.toSnakeCase(entityName);
    }

    joinColumnName(propertyName: string): string {
        return this.toSnakeCase(propertyName);
    }

    joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
        return this.toSnakeCase(entityName) + '_' + (referencedColumnName || 'id');
    }

    propertyToColumnName(propertyName: string): string {
        return this.toSnakeCase(propertyName);
    }

    referenceColumnName(): string {
        return 'id';
    }

    joinTableName(sourceEntity: string, targetEntity: string, propertyName: string): string;
    joinTableName(sourceEntity: string, targetEntity: string, propertyName?: string): string {
        return 'id';
    }

    private toSnakeCase(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
}
export class DbConnector {
    private static instance: DbConnector;
    public static getInstance(): DbConnector {
        if (!this.instance) {
            this.instance = new DbConnector();
        }

        return this.instance;
    }

    private orm_!: MikroORM;
    private logger = LoggerFactory.getLogger();
    private dbConfig: DbConfig = <DbConfig>Config.getConfig(ConfigName.Db);

    private constructor() {}

    public get orm(): MikroORM {
        return this.orm_;
    }

    public get manager(): EntityManager {
        return (this.orm_.em as EntityManager).fork();
    }

    public getRepository<Entity extends object>(entityName: string): EntityRepository<Entity> {
        return this.manager.getRepository<Entity>(entityName);
    }

    public async initialize(): Promise<void> {
        if (!isDefined(this.orm_)) {
            try {
                this.orm_ = await MikroORM.init<PostgreSqlDriver>(
                    defineConfig({ ...this.dbConfig, namingStrategy: CustomSnakeNamingStrategy }),
                );
            } catch (error) {
                this.logger.error('Failed to initialize MikroORM:', error);
                throw error;
            }
        }
    }

    public async closeConnection(): Promise<void> {
        if (isDefined(this.orm_) && (await this.orm_.isConnected())) {
            await this.orm_.close();
        }
    }
}
