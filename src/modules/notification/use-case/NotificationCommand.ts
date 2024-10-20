import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { INotificationCrudService } from '@notification/domain/INotificationCrudService';

export abstract class NotificationCommand<P extends object> extends UseCaseCommand<P> {
    @Inject protected crudService!: INotificationCrudService;
}
