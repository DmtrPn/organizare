import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';

export abstract class NotificationCommand<P extends object> extends UseCaseCommand<P> {
    @Inject protected crudService!: INotificationCrudService;
}
