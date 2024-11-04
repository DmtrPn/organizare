import { FindCommand } from '@common/infrastructure/FindCommand';
import { ExampleModel } from '@example/infrastructure/ExampleModel';
import { ExampleData, ExampleFindOptions } from '@example/domain/types';

export class ExampleFindCommand extends FindCommand<ExampleData, ExampleFindOptions> {
    constructor(options: ExampleFindOptions) {
        super(options, ExampleModel);
    }
}
