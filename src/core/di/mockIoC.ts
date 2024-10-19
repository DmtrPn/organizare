import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@retreat/domain/user/IUserCrudService';
import { MockUserCrudService } from '@retreat/infrastructure/user/mock/MockUserCrudService';
import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';
import { MockRetreatCrudService } from '@retreat/infrastructure/retreat/mock/MockRetreatCrudService';
import { ITelegrafService } from '@retreat/domain/telegraf/ITelegrafService';
import { MockTelegrafService } from '@retreat/infrastructure/telegraf/MockTelegrafService';
import { IRetreatCrudService } from '@retreat/domain/retreat/IRetreatCrudService';
import { MockNotificationCrudService } from '@retreat/infrastructure/notification/mock/MockNotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';

Container.bind(IUserCrudService).to(MockUserCrudService);
Container.bind(IRetreatCrudService).to(MockRetreatCrudService);
Container.bind(INotificationCrudService).to(MockNotificationCrudService);
Container.bind(ITelegrafService).to(MockTelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
