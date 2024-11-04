import { ExampleData, ExampleFindOptions, ExampleUpdateData, ExampleCreateData } from '@example/domain/types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IExampleCrudService extends ICrudService<
    ExampleData,
    ExampleCreateData,
    ExampleUpdateData,
    ExampleFindOptions
> {}
