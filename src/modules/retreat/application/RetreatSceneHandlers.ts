import { IRetreatHandlers } from '@bot/interfaces/IRetreatHandlers';
import { createRetreat, RetreatCreateParams } from '@retreat/use-case/retreat/RetreatCreateCommand';

export class RetreatSceneHandlers implements IRetreatHandlers {
    public async create(params: RetreatCreateParams): Promise<void> {
        await createRetreat(params);
    }
}
