import { IAuditLogService } from './IAuditLogService';

export const enum BotAuditEventType {
    Start = 'Start',
    Command = 'Command',
    Text = 'Text',
    GetMovie = 'GetMovie',
    ActionGetMovie = 'ActionGetMovie',
}

class BotAuditLogService extends IAuditLogService<BotAuditEventType> {}

export const botAuditLogService = new BotAuditLogService();
