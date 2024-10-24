import { ReminderCommand } from './ReminderCommand';
import { ReminderCreateData } from '@reminder/domain/types';

interface Params extends ReminderCreateData {}

export class ReminderCreateCommand extends ReminderCommand<Params> {
    public async execute(): Promise<void> {
        await this.crudService.create(this.params);
    }
}
