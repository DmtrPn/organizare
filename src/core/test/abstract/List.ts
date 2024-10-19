import compact from 'lodash/compact';

import type { Optional } from '@project-types/common';

export const enum SortingOrder {
    ASC = 'asc',
    DESC = 'desc',
}
import { isDefined } from '@utils/isDefined';
import { DateHelper, DateType } from '@utils/DateHelper';

export interface IList<ListParams, CreateParams, FilterParams = null, I = string> {
    ids: I[];
    isDataSet: boolean;
    values: ListParams[];
    filteredValues: ListParams[];
    filteredValuesIds: I[];
    has(id: I): boolean;
    get(id: I): Optional<ListParams>;
    getValuesByIds(ids: I[]): ListParams[];
    getFilteredValues(filterParams: FilterParams): ListParams[];
    getFilteredValuesIds(filterParams: FilterParams): I[];
    getFilterParams(): FilterParams;
    setFilterParams(params: FilterParams): void;
    updateFilterParams(params: Partial<FilterParams>): void;
    getOrderParams(): OrderParams;
    setOrderParams(params: OrderParams): void;
    set(params: CreateParams[]): void;
    add(params: CreateParams[]): void;
    addIfNotExist(params: CreateParams[]): void;
    update(id: I, value: CreateParams): void;
    remove(id: I): void;
    reset(): void;
    serialize?(): CreateParams[];
}

export interface IListItem<P> {
    serialize?(): P;
}

export interface OrderParams {
    fieldName: string;
    order: SortingOrder;
}

export abstract class List<ListParams, CreateParams, FilterParams = null, I = string>
    implements IList<ListParams, CreateParams, FilterParams, I>
{
    protected readonly identifiableFieldName: string = 'id';

    protected filterParams: FilterParams = {} as FilterParams;
    protected orderParams: OrderParams = {} as OrderParams;
    protected list: Map<I, ListParams> = new Map();

    private isSetted = false;

    constructor(params?: CreateParams[]) {
        if (params) {
            this.set(params);
        }
    }

    public get isDataSet(): boolean {
        return this.isSetted;
    }

    public get ids() {
        return Array.from(this.list.keys());
    }

    public get values(): ListParams[] {
        return Array.from(this.list.values());
    }

    public get orderedValues(): ListParams[] {
        return this.getOrderedValues(this.values);
    }

    public get filteredValues(): ListParams[] {
        const filteredValues = this.values.filter(value => this.filterValue(value, this.filterParams));

        return this.getOrderedValues(filteredValues);
    }

    public get filteredValuesIds(): I[] {
        return this.filteredValues.map(value => this.getId(value));
    }

    public getValuesByIds(ids: I[]): ListParams[] {
        return compact(ids.map(id => this.get(id)));
    }

    public forEach(callbackfn: (value: ListParams, key: I) => void, _?: any): void {
        this.list.forEach(callbackfn);
    }

    public set(params: CreateParams[]): void {
        this.reset();

        this.isSetted = true;

        this.add(params);
    }

    public add(params: CreateParams[]): void {
        params.forEach(createParams => {
            this.list.set(this.getId(createParams), this.create(createParams));
        });
    }

    public addIfNotExist(params: CreateParams[]): void {
        params.forEach(createParams => {
            const id = this.getId(createParams);
            if (!this.has(id)) {
                this.list.set(this.getId(createParams), this.create(createParams));
            }
        });
    }

    public update(id: I, value: CreateParams): void {
        this.list.set(id, this.create(value));
    }

    public remove(id: I): void {
        this.list.delete(id);
    }

    public reset(): void {
        this.list.clear();
    }

    public get(id: I): ListParams {
        return this.list.get(id)!;
    }

    public has(id: I): boolean {
        return this.list.has(id);
    }

    public getSize(): number {
        return this.list.size;
    }

    public getFilterParams(): FilterParams {
        return this.filterParams;
    }

    public setFilterParams(params = {} as FilterParams) {
        this.filterParams = params;
    }

    public updateFilterParams(params: Partial<FilterParams>) {
        this.filterParams = { ...this.filterParams, ...params };
    }

    public getOrderParams(): OrderParams {
        return this.orderParams;
    }

    public setOrderParams(params: OrderParams): void {
        this.orderParams = params || ({} as OrderParams);
    }

    public hasFilteredValues(filterParams: FilterParams): boolean {
        return this.values.some(value => this.filterValue(value, filterParams));
    }

    public getFilteredValues(filterParams: FilterParams): ListParams[] {
        return this.getOrderedValues(this.values.filter(value => this.filterValue(value, filterParams)));
    }

    public getFilteredValuesIds(filterParams: FilterParams): I[] {
        return this.getFilteredValues(filterParams).map(value => this.getId(value));
    }

    protected getOrderedValues(params: ListParams[]): ListParams[] {
        return params;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected filterValue(value: ListParams, filterParams: FilterParams): boolean {
        return true;
    }

    protected getId(value: ListParams | CreateParams): I {
        return value[this.identifiableFieldName];
    }

    protected abstract create(params: CreateParams): ListParams;

    protected filterFieldValue(value: ListParams, filterValue: Optional<any>, fieldName: keyof ListParams): boolean {
        return isDefined(filterValue) ? value[fieldName] === filterValue : true;
    }

    protected filterExecuteFieldValue(
        value: ListParams,
        executeValue: Optional<any>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(executeValue) ? value[fieldName] !== executeValue : true;
    }

    protected filterFieldValueByArray(
        value: ListParams,
        filterValue: Optional<any[]>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue) ? filterValue.includes(value[fieldName]) : true;
    }

    protected filterArrayFieldValue(
        value: ListParams,
        filterValue: Optional<any>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue) ? (value[fieldName] as unknown as any[]).includes(filterValue) : true;
    }

    protected filterArrayFieldValueByArray(
        value: ListParams,
        filterValue: Optional<any[]>,
        fieldName: keyof ListParams,
    ): boolean {
        const filterValuesSet = isDefined(filterValue) ? new Set(filterValue) : undefined;
        return isDefined(filterValuesSet)
            ? (value[fieldName] as unknown as any[]).some(item => filterValuesSet.has(item))
            : true;
    }

    protected filterFieldValueIncludesString(
        value: ListParams,
        filterValue: Optional<string>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue) && filterValue.length > 0
            ? ((value[fieldName] as unknown as string) || '').toLocaleLowerCase().includes(filterValue.toLowerCase())
            : true;
    }

    protected filterFieldValueBySameDay(
        value: ListParams,
        filterValue: Optional<DateType>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue)
            ? DateHelper.isSameDay(filterValue, value[fieldName] as unknown as DateType)
            : true;
    }

    protected filterFieldValueBySameOrAfterDate(
        value: ListParams,
        filterValue: Optional<DateType>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue)
            ? DateHelper.isSameOrAfter(filterValue, value[fieldName] as unknown as DateType)
            : true;
    }

    protected filterFieldValueByBeforeDate(
        value: ListParams,
        filterValue: Optional<DateType>,
        fieldName: keyof ListParams,
    ): boolean {
        return isDefined(filterValue)
            ? DateHelper.isBefore(filterValue, value[fieldName] as unknown as DateType)
            : true;
    }
}
