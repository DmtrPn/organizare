import { IReminderHandlers, ReminderCreateData } from '@bot/interfaces/IReminderHandlers';
import { createReminder } from '@users/use-case/reminder.CreateCommand';

export class ReminderSceneHandlers implements IReminderHandlers {
    public async create(params: ReminderCreateData): Promise<void> {
        await createReminder(params);
    }
}
