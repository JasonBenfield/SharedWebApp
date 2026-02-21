export interface CustomEventListener<TEventArgs> {
    (evt: CustomEvent<TEventArgs>): void;
}

type CustomEventTargets<TEvents> = {
    [K in keyof TEvents]: CustomEventTarget<TEvents[K]>;
}

type CustomEventRegistrations<TEvents> = {
    [K in keyof TEvents]: CustomEventRegistration<TEvents[K]>;
}

type EventTemplate<TEvents> = {
    [K in keyof TEvents]: TEvents[K] | null;
}

export class EventManager<TEvents> {
    readonly events: CustomEventTargets<TEvents> = {} as CustomEventTargets<TEvents>;
    readonly when: CustomEventRegistrations<TEvents> = {} as CustomEventRegistrations<TEvents>;

    constructor(template: EventTemplate<TEvents>) {
        for (const key in template) {
            const event = new CustomEventTarget<any>(key);
            this.events[key] = event;
            this.when[key] = new CustomEventRegistration(event);
        }
    }

    dispose() {
        const events = this.events as any;
        const when = this.when as any;
        for (const key of Object.keys(this.events)) {
            events[key].dispose();
            delete events[key];
            delete when[key];
        }
    }
}

class CustomEventRegistration<TArgs> {
    constructor(private readonly event: CustomEventTarget<TArgs>) {
    }

    then(listener: CustomEventListener<TArgs>) {
        this.event.register(listener);
    }
}

class CustomEventTarget<TArgs> {
    private readonly _target = new EventTarget();
    private readonly _listeners: CustomEventListener<TArgs>[] = [];

    constructor(private readonly type: string) {
    }

    register(listener: CustomEventListener<TArgs>) {
        this._listeners.push(listener);
        this._target.addEventListener(this.type, listener as EventListener);
    }

    invoke(args: TArgs) {
        this._target.dispatchEvent(
            new CustomEvent(
                this.type,
                {
                    detail: args
                }
            )
        );
    }

    unregister(listener: CustomEventListener<TArgs>) {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
        this._target.removeEventListener(this.type, listener as EventListener);
    }

    dispose() {
        for (const listener of this._listeners) {
            this._target.removeEventListener(this.type, listener as EventListener);
        }
        this._listeners.splice(0, this._listeners.length);
    }
}