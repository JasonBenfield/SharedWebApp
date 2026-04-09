export interface CustomEventListener<TEventArgs> {
    (evt: CustomEvent<TEventArgs>): void;
}

type CustomEventTargets<TEvents> = {
    [K in keyof TEvents]: CustomEventTarget<TEvents[K]>;
}

export type CustomEventRegistrations<TEvents> = {
    [K in keyof TEvents]: CustomEventRegistration<TEvents[K]>;
}

export type EventTemplate<TEvents> = {
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

interface IEvents {
    [name: string]: CustomEventTarget<any>;
}

interface IWhen {
    [name: string]: CustomEventRegistration<any>;
}

class EventManagerEvents<TEvents> {
    constructor(
        readonly manager: EventManager,
        readonly template: EventTemplate<TEvents>,
        readonly events: CustomEventTargets<TEvents>,
        readonly when: CustomEventRegistrations<TEvents>
    ) {
    }
}

export class EventManager {
    private _target: EventTarget | null = null;

    private get target() {
        let target = this._target;
        if (!target) {
            target = new EventTarget();
            this._target = target;
        }
        return target;
    }

    private readonly events: IEvents = {};
    private readonly when: IWhen = {};

    addEvents<TEvents>(template: EventTemplate<TEvents>) {
        for (const key in template) {
            const event = new CustomEventTarget<any>(key, this.target);
            if (!this.events[key]) {
                this.events[key] = event;
            }
            if (!this.when[key]) {
                this.when[key] = new CustomEventRegistration(event);
            }
        }
        return new EventManagerEvents(
            this,
            template,
            this.events as CustomEventTargets<TEvents>,
            this.when as CustomEventRegistrations<TEvents>
        );
    }

    notify<TOtherEvents>(otherEventManger: EventManager, template: EventTemplate<TOtherEvents>) {
        if (Object.is(this, otherEventManger)) {
            throw new Error("Event Manager cannot notify itself");
        }
        if (template instanceof EventManagerEvents) {
            template = template.template;
        }
        for (const key in template) {
            if (!this.events[key]) {
                throw new Error(`Event '${key}' not found.`);
            }
            this.events[key].addEventTarget(otherEventManger.target);
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