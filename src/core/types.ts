import { Scenes } from 'telegraf';
import { Nullable } from '@project-types/common';

export interface SessionData<D = object> extends Scenes.SceneSession {
    currentData?: Nullable<D>;
}

export interface Context<D = void> extends Scenes.SceneContext {
    session: SessionData<D>;
}
