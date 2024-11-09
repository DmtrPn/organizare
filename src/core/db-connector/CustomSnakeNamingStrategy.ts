import { AbstractNamingStrategy, NamingStrategy } from '@mikro-orm/core';
import { toSnakeCase } from '@utils/toSnakeCase';

export class CustomSnakeNamingStrategy extends AbstractNamingStrategy implements NamingStrategy {
    public classToTableName(entityName: string): string {
        return toSnakeCase(entityName);
    }

    public joinColumnName(propertyName: string): string {
        return toSnakeCase(propertyName);
    }

    public joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
        return `${toSnakeCase(entityName)}_${referencedColumnName || 'id'}`;
    }

    public propertyToColumnName(propertyName: string): string {
        return toSnakeCase(propertyName);
    }

    public referenceColumnName(): string {
        return 'id';
    }

    public joinTableName(sourceEntity: string, targetEntity: string, propertyName: string): string;
    public joinTableName(sourceEntity: string, targetEntity: string, _?: string): string {
        return `${toSnakeCase(sourceEntity)}_${toSnakeCase(targetEntity)}`;
    }
}
