import { ReminderCommand } from './ReminderCommand';
import { ReminderCreateData } from '@reminder/domain/types';
import { DateHelper } from '@utils/DateHelper';
import { BadRequestError } from '@core/http-error';

interface Params extends ReminderCreateData {}

export class ReminderCreateCommand extends ReminderCommand<Params> {
    public async execute(): Promise<void> {
        this.checkParams();
        await this.crudService.create(this.params);
    }

    private checkParams(): void {
        if (DateHelper.isBefore(this.params.date, new Date())) {
            throw new BadRequestError(`Date ${this.params.date} cant be in the past`);
        }
    }
}

export const createReminder = (params: Params) => new ReminderCreateCommand(params).execute();
export { Params as ReminderCreateParams };
