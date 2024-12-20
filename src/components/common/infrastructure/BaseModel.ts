import { assign } from 'lodash';

export class BaseModel<T> {
    constructor();
    constructor(params: T);
    constructor(params: Partial<T> = {}) {
        assign(this, params);
    }

    public toJSON(): T {
        return { ...this } as unknown as T;
    }
}
