import * as _ from 'lodash';
import * as ko from 'knockout';

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

export class ArrayItemEventCollection {
    private readonly _events = new EventCollection();
    private readonly _arrayEvents: IArrayItemEvent<any>[] = [];
    private readonly _arraySub: ko.Subscription;

    constructor(
        private readonly items: ko.ObservableArray
    ) {
        this._arraySub = this.items.subscribe(this.onArrChanged.bind(this));
    }

    private onArrChanged(arr: any[]) {
        this.unregisterEvents();
        for (let item of arr) {
            for (let evt of this._arrayEvents) {
                let handler = evt.handlerAccessor(item);
                this._events.register(handler, evt.callback, evt.isEnabled);
            }
        }
    }

    register<TArgs>(handlerAccessor: (item: any) => IEventHandler<TArgs>, callback: EventCallback<TArgs>, isEnabled?: () => boolean) {
        this._arrayEvents.push({
            handlerAccessor: handlerAccessor,
            callback: callback,
            isEnabled: isEnabled
        });
        let items = this.items();
        if (items) {
            for (let item of items) {
                let handler = handlerAccessor(item);
                this._events.register(handler, callback, isEnabled);
            }
        }
        return this;
    }

    dispose() {
        this._arraySub.dispose();
        this.unregisterEvents();
    }

    private unregisterEvents() {
        this._events.unregisterAll();
    }
}

class Something { }

interface ITest {
    selected: Something;
}

let test: ITest = {
    selected: typeof Something
} as const;

export type Events<TEvents> = {
    [K in keyof TEvents]: IEvent<TEvents[K]>;
}

export type EventBuilders<TEvents> = {
    [K in keyof TEvents]: EventBuilder<TEvents[K]>;
}

let testEvents: Events<typeof test>;

let testEventBuilders: EventBuilders<typeof test>;

export class EventSource<TEvents> {
    readonly events: Events<TEvents> = {} as Events<TEvents>;
    readonly when: EventBuilders<TEvents> = {} as EventBuilders<TEvents>;

    constructor(source, events: TEvents) {
        const eventCollection = new EventCollection();
        for (const key in events) {
            const event: any = new DefaultEvent(source);
            this.events[key] = event;
            this.when[key] = new EventBuilder(eventCollection, event);
        }
    }
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
        _(this._callbacks).forEach(c => {
            if (c.isEnabled()) {
                c.callback(args, this.source);
            }
        });
    }

    unregister(identifier: any) {
        if (identifier) {
            let index = _(this._callbacks).findIndex(c => c.identifier === identifier);
            while (index > -1) {
                this._callbacks.splice(index, 1);
                index = _(this._callbacks).findIndex(c => c.identifier === identifier);
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
