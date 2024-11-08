import { NotificationCommand } from './NotificationCommand';
import { NotificationEntityType } from '@notification/domain/notification.types';
import { isDefined } from '@utils/isDefined';
import { AlreadyExistsError } from '@common/domain/errors/AlreadyExistsError';

interface Params {
    id: string;
    chatId: string;
    entityId: string;
    entityType: NotificationEntityType;
    message: string;
    executeAt: Date;
}

export class NotificationCreateCommand extends NotificationCommand<Params> {
    public async execute(): Promise<void> {
        await this.checkExist();
        await this.removeCurrentIdfExist();

        await this.crudService.create(this.params);
    }

    private async checkExist(): Promise<void> {
        const notification = await this.crudService.getById(this.params.id);

        if (isDefined(notification)) {
            throw new AlreadyExistsError({ entityName: 'Notification', id: this.params.id });
        }
    }

    private async removeCurrentIdfExist(): Promise<void> {
        const current = await this.crudService.find({ entityId: this.params.entityId });

        await Promise.all(current.map(({ id }) => this.crudService.remove(id)));
    }
}

export const createNotification = (params: Params): Promise<void> => new NotificationCreateCommand(params).execute();
export { Params as CreateNotificationCommandParams };
