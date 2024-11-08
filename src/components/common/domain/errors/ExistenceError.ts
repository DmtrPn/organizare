import { DomainError } from './DomainError';

export interface ExistenceErrorParams {
    entityName?: string;
    endOfMessage?: string;
}

export abstract class ExistenceError<T extends ExistenceErrorParams> extends DomainError<T> {
    protected override createMessage({
        entityName = 'Entity',
        endOfMessage = this.defaultEndOfMessage,
        ...parameters
    }: T): string {
        type ParametersType = Omit<T, 'entityName' | 'endOfMessage'>;
        const parametersString = Object.keys(parameters as ParametersType)
            .map(key => `${key} = ${(parameters as ParametersType)[key as keyof ParametersType]}`)
            .join(', ');

        return `${entityName} ${endOfMessage}: ${parametersString}`;
    }

    protected abstract defaultEndOfMessage: string;
}
