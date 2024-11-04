import { Class } from '@project-types/common';

import { IExampleCrudService } from '@example/domain/IExampleCrudService';
import { ExampleCreateData, ExampleData, ExampleFindOptions, ExampleUpdateData } from '@example/domain/types';

import { ExampleModel } from './ExampleModel';
import { ExampleFindCommand } from './ExampleFindCommand';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

export class ExampleCrudService
    extends IdentityCrudService<ExampleData, ExampleCreateData, ExampleUpdateData, ExampleFindOptions>
    implements IExampleCrudService
{
    protected modelClass = ExampleModel;
    protected findCommand: Class<FindCommand<ExampleData, ExampleFindOptions>, any> = ExampleFindCommand;

    protected enrichCreationParams(params: ExampleCreateData): ExampleModel {
        return new ExampleModel({ ...params });
    }
}
