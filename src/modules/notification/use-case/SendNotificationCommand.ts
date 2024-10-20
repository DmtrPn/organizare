import { Inject } from 'typescript-ioc';

import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { NotificationModel } from '../infrastructure/NotificationModel';
import { NotificationStatus } from '../domain/types';

import { NotificationCommand } from './NotificationCommand';

interface Params extends NotificationModel {}

export class SendNotificationCommand extends NotificationCommand<Params> {
    @Inject protected telegrafService!: ITelegrafService;

    public async execute(): Promise<void> {
        const { id, chatId, message } = this.params;
        await this.telegrafService.sendMessage(chatId, message);
        await this.crudService.update(id, { status: NotificationStatus.Executed });
    }
}

export const sendNotification = (params: Params) => new SendNotificationCommand(params).execute();