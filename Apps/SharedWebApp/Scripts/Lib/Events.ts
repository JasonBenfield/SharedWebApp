
export class EventCollection {
    private readonly _identifier: any;
    private readonly _events: IEvent<any>[] = [];

    constructor() {
        this._identifier = this;
    }

    register<TArgs>(evt: IEventHandler<TArgs>, callback: EventCallback<TArgs>, isEnabled?: () => boolean) {
        this._events.push(<IEvent<any>>evt.register(callback, this._identifier, isEnabled));
        return this;
    }

    dispose() {
        this.unregisterAll();
    }

    unregisterAll() {
        this._events.forEach(s => s.unregister(this._identifier));
        this._events.splice(0, this._events.length);
    }
}

export type Events<TEvents> = {
    [K in keyof TEvents]: IEvent<TEvents[K]>;
}

export type EventBuilders<TEvents> = {
    [K in keyof TEvents]: EventBuilder<TEvents[K]>;
}

export class EventSource<TEvents> {
    private readonly eventCollection = new EventCollection();
    readonly events: Events<TEvents> = {} as Events<TEvents>;
    readonly when: EventBuilders<TEvents> = {} as EventBuilders<TEvents>;

    constructor(source, events: TEvents) {
        for (const key in events) {
            const event: any = new DefaultEvent(source);
            this.events[key] = event;
            this.when[key] = new EventBuilder(this.eventCollection, event);
        }
    }

    unregisterAll() { this.eventCollection.unregisterAll(); }
}

export class EventBuilder<TArgs> {
    constructor(private readonly eventCollection: EventCollection, private readonly event: IEvent<TArgs>) {
    }

    then(callback: EventCallback<TArgs>) {
        this.eventCollection.register(this.event, callback);
    }
}

export class DefaultEvent<TArgs> implements IEvent<TArgs>, IEventHandler<TArgs> {
    private static defaultIsEnabled() {
        return true;
    }

    constructor(private readonly source: any) {
    }

    private readonly _callbacks: RegisteredEventCallback[] = [];

    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean) {
        this._callbacks.push({
            callback: callback,
            identifier: identifier,
            isEnabled: isEnabled || DefaultEvent.defaultIsEnabled
        });
        return this;
    }

    invoke(args: TArgs) {
        for (const c of this._callbacks) {
            if (c.isEnabled()) {
                c.callback(args, this.source);
            }
        };
    }

    unregister(identifier: any) {
        if (identifier) {
            let index = this._callbacks.findIndex(c => c.identifier === identifier);
            while (index > -1) {
                this._callbacks.splice(index, 1);
                index = this._callbacks.findIndex(c => c.identifier === identifier);
            }
        }
    }

    dispose() {
        this._callbacks.splice(0, this._callbacks.length);
    }

    handler() {
        return new DefaultEventHandler<TArgs>(this);
    }
}

export class DefaultEventHandler<TArgs> implements IEventHandler<TArgs> {
    constructor(private readonly source: IEvent<TArgs>) {
    }

    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean) {
        this.source.register(callback, identifier, isEnabled);
        return this.source;
    }

    unregister(identifier: any) {
        this.source.unregister(identifier);
    }
}

export class SimpleEvent extends DefaultEvent<any> {
    constructor(source: any) {
        super(source);
    }

    invoke() {
        super.invoke(null);
    }
}
