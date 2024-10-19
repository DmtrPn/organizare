import { Singleton } from 'typescript-ioc';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class IEventEmitter {
    public abstract emit(name: string, payload: object): void;
    public abstract addListener(name: string, listenerFn: Function): void;
}

@Singleton
export class EventEmitter implements IEventEmitter {
    private eventEmitter = new EventEmitter2();

    public emit(name: string, payload: object): void {
        this.eventEmitter.emit(name, payload);
    }

    public addListener(name: string, listenerFn: Function): void {
        this.eventEmitter.addListener(name, listenerFn as any);
    }
}
