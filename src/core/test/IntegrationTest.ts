import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';
import { BeforeAll } from '@core/test/decorators/testDecorators';
import { createUser } from '@users/use-case/user.CreateCommand';
import { UserData } from '@users/domain/user.types';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { isDefined } from '@utils/isDefined';

interface CommonData {
    user: UserData;
}

export abstract class IntegrationTest {
    @Inject protected userCrudService!: IUserCrudService;

    protected commonData: CommonData = {
        user: {
            id: '3ef2645f-2077-4562-b495-f8e58d10f3e5',
            chatId: '3ef2645f-2077-4562-b495-f8e58d10f3e5',
            firstName: 'firstName',
            lastName: 'firstName',
        },
    };

    @BeforeAll()
    public async beforeAll(): Promise<void> {
        const user = await this.userCrudService.getById(this.commonData.user.id);

        if (!isDefined(user)) {
            await createUser(this.commonData.user);
        }
    }

    protected get chatId(): string {
        return this.commonData.user.chatId;
    }
}
