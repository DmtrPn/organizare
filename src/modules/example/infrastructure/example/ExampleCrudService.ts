import { Class } from '@project-types/common';

import { IExampleCrudService } from '@example/domain/example/IExampleCrudService';
import { ExampleCreateData, ExampleFindOptions, ExampleUpdateData } from '@example/domain/example/types';

import { ExampleModel } from './ExampleModel';
import { ExampleFindCommand } from './ExampleFindCommand';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

export class ExampleCrudService
    extends IdentityCrudService<ExampleModel, ExampleCreateData, ExampleUpdateData, ExampleFindOptions>
    implements IExampleCrudService
{
    protected modelClass = ExampleModel;
    protected findCommand: Class<FindCommand<ExampleModel, ExampleFindOptions>, any> = ExampleFindCommand;

    protected enrichCreationParams(params: ExampleCreateData): ExampleModel {
        return new ExampleModel({ ...params });
    }
}
