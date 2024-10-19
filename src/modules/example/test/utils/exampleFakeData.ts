import { Attributes } from '@project-types/common';

import { ExampleModel } from '@example/infrastructure/example/ExampleModel';
import { FakeParams } from '@core/test/FakeParams';
import { ExampleUpdateData } from '@example/domain/example/types';

export const getFakeExampleCreationParams = (): Attributes<ExampleModel> => {
    return {
        id: FakeParams.getId(),
    };
};

export const getFakeExampleUpdateParams = (): ExampleUpdateData => {
    return {};
};
