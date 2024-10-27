import { IReminderHandlers, ReminderCreateData } from '@bot/interfaces/IReminderHandlers';
import { createReminder } from '@reminder/use-case/ReminderCreateCommand';

export class ReminderSceneHandlers implements IReminderHandlers {
    public async create(params: ReminderCreateData): Promise<void> {
        await createReminder(params);
    }
}
