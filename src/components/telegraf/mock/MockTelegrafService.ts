import { ITelegrafService } from '@components/telegraf/ITelegrafService';

export class MockTelegrafService implements ITelegrafService {
    public async sendMessage(_: number | string, __: string): Promise<void> {}
}
