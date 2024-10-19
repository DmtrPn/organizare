import { Optional } from '@project-types/common';

export abstract class ICrudService<M, CP, UP, FO> {
    public abstract find(options: FO): Promise<M[]>;
    public abstract getById(id: string): Promise<Optional<M>>;
    public abstract create(params: CP | CP[]): void;
    public abstract update(id: string, params: UP): void;
    public abstract remove(id: string): void;
}
