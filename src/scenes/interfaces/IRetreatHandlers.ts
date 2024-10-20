import { RetreatCreateParams } from '@retreat/use-case/retreat/RetreatCreateCommand';

export abstract class IRetreatHandlers {
    public abstract create(params: RetreatCreateParams): Promise<void>;
}
