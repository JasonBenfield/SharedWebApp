export interface CustomEventListener<TEventArgs> {
    (evt: CustomEvent<TEventArgs>): void;
}

type CustomEventTargets<TEvents> = {
    [K in keyof TEvents]: CustomEventTarget<TEvents[K]>;
}

export type CustomEventRegistrations<TEvents> = {
    [K in keyof TEvents]: CustomEventRegistration<TEvents[K]>;
}

type EventTemplate<TEvents> = {
    [K in keyof TEvents]: TEvents[K] | null;
}

export class EventManager<TEvents> {
    private readonly _target: EventTarget;
    readonly events: CustomEventTargets<TEvents> = {} as CustomEventTargets<TEvents>;
    readonly when: CustomEventRegistrations<TEvents> = {} as CustomEventRegistrations<TEvents>;

    constructor(template: EventTemplate<TEvents>) {
        this._target = new EventTarget();
        for (const key in template) {
            const event = new CustomEventTarget<any>(key, this._target);
            this.events[key] = event;
            this.when[key] = new CustomEventRegistration(event);
        }
    }

    notify<TOtherEvents>(otherEventManger: EventManager<TOtherEvents>) {
        if (Object.is(this, otherEventManger)) {
            throw new Error("Event Manager cannot notify itself");
        }
        const events = this.events as any;
        const eventKeys = Object.keys(this.events);
        for (const key of eventKeys) {
            events[key].addEventTarget(otherEventManger._target);
        }
    }

    dispose() {
        const events = this.events as any;
        const when = this.when as any;
        const eventKeys = Object.keys(this.events);
        for (const key of eventKeys) {
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
    private readonly _targets: EventTarget[] = [];
    private readonly _listeners: CustomEventListener<TArgs>[] = [];

    constructor(
        private readonly type: string,
        private readonly _target: EventTarget
    ) {
        this._targets.push(this._target);
    }

    addEventTarget(target: EventTarget) {
        this._targets.push(target);
    }

    register(listener: CustomEventListener<TArgs>) {
        this._listeners.push(listener);
        this._target.addEventListener(this.type, listener as EventListener);
    }

    invoke(args: TArgs) {
        for (const target of this._targets) {
            target.dispatchEvent(
                new CustomEvent(
                    this.type,
                    {
                        detail: args
                    }
                )
            );
        }
    }

    unregister(listener: CustomEventListener<TArgs>) {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
        this._target.removeEventListener(this.type, listener as EventListener);
    }

    dispose() {
        const listeners = this._listeners.splice(0, this._listeners.length);
        for (const listener of listeners) {
            this._target.removeEventListener(this.type, listener as EventListener);
        }
        this._targets.splice(0, this._targets.length);
    }
}