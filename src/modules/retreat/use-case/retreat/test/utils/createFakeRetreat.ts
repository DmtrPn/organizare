import { RetreatCreateData } from '@retreat/domain/retreat/types';

import { getFakeRetreatCreationParams } from './retreatFakeData';
import { createRetreat } from '../../RetreatCreateCommand';

export async function createFakeRetreat(params: Partial<RetreatCreateData> = {}): Promise<RetreatCreateData> {
    const retreat = getFakeRetreatCreationParams(params);
    await createRetreat(retreat);
    return retreat;
}
