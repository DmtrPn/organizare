import { UserData } from '@users/domain/user.types';
import { Inject } from 'typescript-ioc';
import { IUserCrudService } from '@users/domain/IUserCrudService';
import { isDefined } from '@utils/isDefined';
import { createUser } from '@users/use-case/user.CreateCommand';
import { FakeParams } from '@core/test/FakeParams';

interface CommonDataParams {
    user: UserData;
}

export class TestCommonData {
    private static instance: TestCommonData;
    public static getInstance(): TestCommonData {
        if (!this.instance) {
            this.instance = new TestCommonData();
        }

        return this.instance;
    }

    public data: CommonDataParams = {
        user: {
            id: FakeParams.getId(),
            chatId: FakeParams.getId(),
            firstName: FakeParams.getName(),
            lastName: FakeParams.getName(),
        },
    };

    @Inject private userCrudService!: IUserCrudService;

    private constructor() {}

    public async init(): Promise<void> {
        const user = await this.userCrudService.getById(this.data.user.id);

        if (!isDefined(user)) {
            await createUser({ ...this.data.user, ifNotExist: true });
        }
    }
}
