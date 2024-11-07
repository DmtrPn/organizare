import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { TestCommonData } from '@core/test/TestCommonData';

export abstract class IntegrationTest {
    @Inject protected userCrudService!: IUserCrudService;

    protected commonData = TestCommonData.getInstance();

    protected get chatId(): string {
        return this.commonData.data.user.chatId;
    }

    protected get userId(): string {
        return this.commonData.data.user.id;
    }
}
