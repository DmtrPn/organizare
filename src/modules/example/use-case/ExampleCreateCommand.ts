import { ExampleCommand } from './ExampleCommand';
import { ExampleCreateData } from '@example/domain/types';

interface Params extends ExampleCreateData {}

export class ExampleCreateCommand extends ExampleCommand<Params> {
    public execute(): void | Promise<void> {
        return undefined;
    }
}
