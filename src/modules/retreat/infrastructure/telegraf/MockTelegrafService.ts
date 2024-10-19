import { ITelegrafService } from '@retreat/domain/telegraf/ITelegrafService';

export class MockTelegrafService implements ITelegrafService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async sendMessage(chatId: number | string, text: string): Promise<void> {}
}
