import { Inject } from 'typescript-ioc';

import { CreateRetreatEvent } from '@events/retreat/CreateRetreatEvent';
import { IEventEmitter } from '@events/EventEmitter';
import { createNotificationForRetreat } from '../../use-case/notification/CreateNotificationForRetreatCommand';

export class NotificationEventListener {
    @Inject protected eventEmitter!: IEventEmitter;

    constructor() {
        this.eventEmitter.addListener(CreateRetreatEvent.Name, this.onCreateRetreat);
    }

    public async onCreateRetreat({ body: { id: retreatId, ...body } }: CreateRetreatEvent): Promise<void> {
        await createNotificationForRetreat({ retreatId, ...body });
    }
}
