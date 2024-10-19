import { FindCommand } from '@common/infrastructure/FindCommand';
import { ExampleModel } from '@example/infrastructure/example/ExampleModel';
import { ExampleFindOptions } from '@example/domain/example/types';

export class ExampleFindCommand extends FindCommand<ExampleModel, ExampleFindOptions> {
    constructor(options: ExampleFindOptions) {
        super(options, ExampleModel);
    }
}
