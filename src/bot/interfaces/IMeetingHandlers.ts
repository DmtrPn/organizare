export interface ReminderCreateData {
    id: string;
    chatId: string;
    date: Date;
    text: string;
}

export abstract class IReminderHandlers {
    public abstract create(params: ReminderCreateData): Promise<void>;
}
