import { FakeParams } from '@core/test/FakeParams';
import { ExampleData, ExampleUpdateData } from '@example/domain/types';

export const getFakeExampleCreationParams = (params: Partial<ExampleData> = {}): ExampleData => {
    return {
        ...params,
        id: FakeParams.getId(),
    };
};

export const getFakeExampleUpdateParams = (params: Partial<ExampleUpdateData> = {}): ExampleUpdateData => {
    return params;
};
