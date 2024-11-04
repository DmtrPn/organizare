import { List } from '@core/test/abstract/List';
import { ExampleCreateData, ExampleFindOptions } from '@example/domain/types';

import { ExampleModel } from '@example/infrastructure/ExampleModel';

export class ExampleList extends List<ExampleModel, ExampleCreateData, ExampleFindOptions> {
    protected override create(params: ExampleCreateData): ExampleModel {
        return new ExampleModel({
            ...params,
        });
    }

    protected override filterValue(value: ExampleModel, { id }: ExampleFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id');
    }
}
