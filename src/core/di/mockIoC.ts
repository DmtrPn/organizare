import { Container } from 'typescript-ioc';

import { IUserCrudService } from '@users/domain/IUserCrudService';
import { MockUserCrudService } from '@users/infrastructure/mock/MockUserCrudService';
import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { MockRetreatCrudService } from '@retreat/infrastructure/mock/MockRetreatCrudService';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { MockTelegrafService } from '@components/telegraf/mock/MockTelegrafService';
import { IRetreatCrudService } from '@retreat/domain/IRetreatCrudService';
import { MockNotificationCrudService } from '@notification/infrastructure/mock/MockNotificationCrudService';
import { EventEmitter, IEventEmitter } from '@events/EventEmitter';
import { IUserHandlers } from '../../bot/interfaces/IUserHandlers';
import { UserSceneHandlers } from '@users/applcation/UserSceneHandlers';
import { IRetreatHandlers } from '../../bot/interfaces/IRetreatHandlers';
import { RetreatSceneHandlers } from '@retreat/application/RetreatSceneHandlers';

Container.bind(IUserCrudService).to(MockUserCrudService);
Container.bind(IRetreatCrudService).to(MockRetreatCrudService);
Container.bind(INotificationCrudService).to(MockNotificationCrudService);
Container.bind(ITelegrafService).to(MockTelegrafService);
Container.bind(IEventEmitter).to(EventEmitter);
Container.bind(IUserHandlers).to(UserSceneHandlers);
Container.bind(IRetreatHandlers).to(RetreatSceneHandlers);
