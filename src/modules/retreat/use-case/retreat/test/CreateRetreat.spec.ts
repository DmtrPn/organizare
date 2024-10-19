import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { IRetreatCrudService } from '@retreat/domain/retreat/IRetreatCrudService';
import { expectError } from '@core/test/expectError';
import { AlreadyExistsError } from '@common/domain/errors/AlreadyExistsError';

import { createRetreat } from '../RetreatCreateCommand';
import { getFakeRetreatCreationParams } from './utils/retreatFakeData';
import { createFakeUser } from '../../user/test/utils/createFakeUser';
import { IEventEmitter } from '@events/EventEmitter';
import { CreateRetreatEvent } from '@events/retreat/CreateRetreatEvent';

@Describe()
export class CreateRetreatSpec {
    @Inject protected eventEmitter!: IEventEmitter;
    @Inject protected crudService!: IRetreatCrudService;
    private chatId!: number;

    @BeforeAll()
    public async beforeAll(): Promise<void> {
        const user = await createFakeUser();
        this.chatId = user.chatId;
    }

    @Test('Create retreat test')
    public async createTest(): Promise<void> {
        const params = getFakeRetreatCreationParams({ chatId: this.chatId });
        await createRetreat(params);

        const retreat = await this.crudService.getById(params.id);

        expect(retreat).toEqual(params);
    }

    @Test('Create event on retreat create test')
    public async createEventOnRetreatCreatedTest(): Promise<void> {
        const params = getFakeRetreatCreationParams({ chatId: this.chatId });
        let isEventCreated = false;
        this.eventEmitter.addListener(CreateRetreatEvent.Name, () => {
            isEventCreated = true;
        });
        await createRetreat(params);

        expect(isEventCreated).toBeTruthy();
    }

    @expectError(AlreadyExistsError)
    @Test('Cant create retreat with exist id')
    public async createRetreatWithExistIdTest(): Promise<void> {
        const params = getFakeRetreatCreationParams({ chatId: this.chatId });
        await createRetreat(params);
        await createRetreat(params);
    }
}
