export abstract class ITelegrafService {
    public abstract sendMessage(chatId: number | string, text: string): Promise<void>;
}
