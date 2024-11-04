import { Container } from 'typescript-ioc';

import './IoC';

import { ITelegrafService } from '@components/telegraf/ITelegrafService';
import { MockTelegrafService } from '@components/telegraf/mock/MockTelegrafService';

Container.bind(ITelegrafService).to(MockTelegrafService);
