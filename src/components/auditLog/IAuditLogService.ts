interface EventData<ET> {
    userId: string;
    eventType: ET;
    data: object;
}

export abstract class IAuditLogService<ET> {
    public async logEvent({ userId, eventType, data }: EventData<ET>): Promise<void> {
        console.info(eventType, userId, data);
    }
}
