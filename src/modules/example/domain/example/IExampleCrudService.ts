import { ExampleModel } from '@example/infrastructure/example/ExampleModel';
import { ExampleFindOptions, ExampleUpdateData, ExampleCreateData } from '@example/domain/example/types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IExampleCrudService extends ICrudService<
    ExampleModel,
    ExampleCreateData,
    ExampleUpdateData,
    ExampleFindOptions
> {}
