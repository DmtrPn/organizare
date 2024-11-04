import { Singleton } from 'typescript-ioc';

import { MockCrudService } from '@core/test/abstract/MockCrudService';

import { ExampleCreateData, ExampleUpdateData, ExampleFindOptions } from '@example/domain/types';
import { IExampleCrudService } from '@example/domain/IExampleCrudService';
import { ExampleModel } from '@example/infrastructure/ExampleModel';

import { ExampleList } from './ExampleList';

@Singleton
export class MockExampleCrudService
    extends MockCrudService<ExampleModel, ExampleCreateData, ExampleUpdateData, ExampleFindOptions>
    implements IExampleCrudService
{
    protected list = new ExampleList();
}
