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

export class CustomUIEvent extends CustomEvent<UIEvent> {
    constructor(
        private readonly event: UIEvent,
        readonly element: HTMLElement
    ) {
        super(event.type, { detail: event });
    }

    preventDefault() {
        this.event.preventDefault();
    }

    stopImmediatePropagation() {
        this.event.stopImmediatePropagation();
    }

    stopPropagation() {
        this.event.stopPropagation();
    }
}

export class EventManager<TEvents> {
    private readonly _target: EventTarget;
    readonly events: CustomEventTargets<TEvents> = {} as CustomEventTargets<TEvents>;
    readonly when: CustomEventRegistrations<TEvents> = {} as CustomEventRegistrations<TEvents>;

    constructor(template: EventTemplate<TEvents>) {
        this._target = new EventTarget();
        for (const key in template) {
            const event = new CustomEventTarget<any>(key, this._target);
            Reflect.set(this.events, key, event);
            Reflect.set(this.when, key, new CustomEventRegistration(event));
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

    unregister(listener: CustomEventListener<TArgs>) {
        this.event.unregister(listener);
    }
}

class CustomEventTarget<TArgs> {
    private readonly targets: EventTarget[] = [];
    private readonly listeners: CustomEventListener<TArgs>[] = [];

    constructor(
        private readonly type: string,
        private readonly target: EventTarget
    ) {
        this.targets.push(this.target);
    }

    addEventTarget(target: EventTarget) {
        this.targets.push(target);
    }

    register(listener: CustomEventListener<TArgs>) {
        this.listeners.push(listener);
        this.target.addEventListener(this.type, listener as EventListener);
    }

    invoke(args: TArgs) {
        for (const target of this.targets) {
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
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
        this.target.removeEventListener(this.type, listener as EventListener);
    }

    dispose() {
        const listeners = this.listeners.splice(0, this.listeners.length);
        for (const listener of listeners) {
            this.target.removeEventListener(this.type, listener as EventListener);
        }
        this.targets.splice(0, this.targets.length);
    }
}