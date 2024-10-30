import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { getFakeUserCreationParams } from '@users/test/utils/userFakeData';
import { createUser } from '@users/use-case/UserCreateCommand';
import { UserData } from '@users/domain/types';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { isDefined } from '@utils/isDefined';

interface CommonData {
    user: UserData;
}

export abstract class IntegrationTest {
    @Inject protected userCrudService!: IUserCrudService;

    protected commonData: CommonData = {
        user: getFakeUserCreationParams(),
    };

    protected get chatId(): string {
        return this.commonData.user.chatId;
    }

    @BeforeAll()
    public async beforeAll(): Promise<void> {
        const user = await this.userCrudService.getById(this.commonData.user.id);
        if (!isDefined(user)) {
            await createUser(this.commonData.user);
        }
    }
}