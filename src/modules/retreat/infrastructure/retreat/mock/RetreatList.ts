import { List } from '@core/test/abstract/List';
import { RetreatCreateData, RetreatFindOptions } from '@retreat/domain/retreat/types';

import { RetreatModel } from '../RetreatModel';

export class RetreatList extends List<RetreatModel, RetreatCreateData, RetreatFindOptions> {
    protected create(params: RetreatCreateData): RetreatModel {
        return new RetreatModel(params);
    }

    protected override filterValue(value: RetreatModel, { id, chatId }: RetreatFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id') && this.filterFieldValue(value, chatId, 'chatId');
    }
}
