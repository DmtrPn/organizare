import { ExistenceErrorParams, ExistenceError } from './ExistenceError';

class AlreadyExistsError<T extends ExistenceErrorParams = {}> extends ExistenceError<T> {
    protected get defaultEndOfMessage(): string {
        return 'already exists';
    }
}

const createEntityAlreadyExistsError = (entityName: string) => (id: string) =>
    new AlreadyExistsError({ entityName, id });

export { AlreadyExistsError, createEntityAlreadyExistsError };
