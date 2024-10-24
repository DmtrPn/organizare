export interface UserCreateData {
    id: string;
    chatId: number;
    firstName: string;
    lastName: string;
}

export abstract class IMeetingHandlers {
    public abstract create(params: UserCreateData): Promise<void>;
}
