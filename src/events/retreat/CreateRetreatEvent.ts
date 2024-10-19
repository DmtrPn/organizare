import { RetreatCreateData } from '@retreat/domain/retreat/types';

import { DomainEvent } from '../abstract/DomainEvent';

export interface CreateRetreatEventBody extends RetreatCreateData {}

export class CreateRetreatEvent extends DomainEvent<CreateRetreatEventBody> {
    public static Name = 'retreat.created';
}
