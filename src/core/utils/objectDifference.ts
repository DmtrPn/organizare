import { omit, keys, isEqual } from 'lodash';

export const objectDifference = <T extends Record<string, any>>(obj: T, other: Record<string, any>): Partial<T> => {
    return omit(
        obj,
        keys(obj).filter(key => isEqual(obj[key], other[key])),
    ) as Partial<T>;
};
