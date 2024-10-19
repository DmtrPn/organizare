export class DomainError<T = undefined> extends Error {
    protected parameters: T;

    constructor(parameters: T = {} as T) {
        super();
        this.parameters = parameters;
        this.message = this.createMessage(parameters);
    }

    protected createMessage(_: T): string {
        throw new Error(`${this.constructor.name}.createMessage is undefined`);
    }
}
