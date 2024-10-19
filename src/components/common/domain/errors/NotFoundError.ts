import { ExistenceErrorParams, ExistenceError } from './ExistenceError';

class NotFoundError<T extends ExistenceErrorParams = {}> extends ExistenceError<T> {
    protected get defaultEndOfMessage(): string {
        return 'not found';
    }
}

const errorDataFromId = (id: unknown) => (id instanceof Object ? { ...id } : { id });
const createEntityNotFoundError = (entityName: string) => (id: unknown) =>
    new NotFoundError({ entityName, ...errorDataFromId(id) });

export { NotFoundError, createEntityNotFoundError };
