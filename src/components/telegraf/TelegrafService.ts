import { Telegraf } from 'telegraf';
import { TelegrafBot } from '@components/telegraf/TelegrafBot';
import { ITelegrafService } from '@components/telegraf/ITelegrafService';

export class TelegrafService implements ITelegrafService {
    private telegrafBot: Telegraf = TelegrafBot.getInstance();

    public async sendMessage(chatId: number | string, text: string): Promise<void> {
        await this.telegrafBot.telegram.sendMessage(chatId, text);
    }
}
