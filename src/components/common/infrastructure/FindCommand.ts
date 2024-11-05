import { SelectQueryBuilder } from '@mikro-orm/postgresql';
import { assign, isEmpty, isNull, isUndefined, isArray } from 'lodash';

import { Class, Nullable } from '@project-types/common';

import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { BaseModel } from '@common/infrastructure/BaseModel';

type ValueType<M, P extends keyof M> = Nullable<M[P]> | Nullable<M[P]>[] | undefined;

export abstract class FindCommand<
    M extends object,
    FO,
    DbModel extends BaseModel<M> = BaseModel<M>,
> extends TransactionManager {
    protected modelClass: Class<M>;
    protected qb: SelectQueryBuilder<DbModel>;
    private isReturnEmpty = false;

    protected constructor(fo: FO, modelClass: Class<M>) {
        super();

        assign(this, fo);
        this.modelClass = modelClass;
        this.qb = this.createBuilder(modelClass, this.tableName);
    }

    public execute(): Promise<DbModel[]> {
        return this.buildQuery().getResult();
    }

    protected buildQuery(): this {
        return this.addRelations().addCommonFilters().addFilters().orderBy();
    }

    protected addRelations(): this {
        return this;
    }

    protected addFilters(): this {
        return this;
    }

    protected addCommonFilters(): this {
        return this;
    }

    protected orderBy(): this {
        return this;
    }

    protected getMany(): Promise<DbModel[]> {
        return this.qb.getResult();
    }

    protected filterBy<P extends keyof M & string>(field: P, values: ValueType<M, P>, table = this.tableName): this {
        if (isUndefined(values)) {
            return this;
        }

        const columnName = `${table}.${this.getColumnNameForField(field)}`;

        const isArrayValues = isArray(values);

        if (isArrayValues) {
            this.checkListOnSetAndEmpty(values);
        }
        if (isNull(values)) {
            this.qb.andWhere(`${columnName} IS NULL`);
        } else {
            this.qb.andWhere(isArrayValues ? `${columnName} = ANY(?)` : `${columnName} = ?`, [values]);
        }

        return this;
    }

    private get tableName(): string {
        return this.getTableName(this.modelClass);
    }

    private checkListOnSetAndEmpty(list: any) {
        if (isEmpty(list)) {
            this.isReturnEmpty = true;
        }
    }

    private createBuilder(modelClass: Class<M>, alias: string): SelectQueryBuilder<DbModel> {
        return this.manager.createQueryBuilder(modelClass, alias).select('*');
    }

    private getTableName(modelClass: Function): string {
        return this.manager.getMetadata(modelClass).tableName;
    }

    private getColumnNameForField(fieldName: string): string | undefined {
        const metadata = this.manager.getMetadata(this.modelClass);
        const fieldProp = metadata.props.find(prop => prop.name === fieldName);

        return fieldProp?.fieldNames[0];
    }

    private async getResult(): Promise<DbModel[]> {
        return this.isReturnEmpty ? [] : this.getMany();
    }
}
