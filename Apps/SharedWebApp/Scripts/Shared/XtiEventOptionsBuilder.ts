export class XtiEventOptionsBuilder {
    private options: IXtiEventBindingOptions = {};

    clear() { this.options = {}; }

    option(name: string): IXtiEventOptionsBuilder {
        return new XtiEventOptionsBuilder2(this, this.options[name]);
    }

    on(name: string, callback: IXtiEventCallback) {
        this.options[name] = { callback: callback, selector: null, preventDefault: false };
        return new XtiEventOptionsBuilder2(this, this.options[name]);
    }

    build() { return this.options; }
}

export class XtiEventOptionsBuilder2 implements IXtiEventOptionsBuilder {
    constructor(
        private readonly builder: XtiEventOptionsBuilder,
        private readonly options: IXtiEventOptions
    ) {
    }

    select(selector: string) {
        this.options.selector = selector;
        return this;
    }

    preventDefault() {
        this.options.preventDefault = true;
        return this;
    }

    add(name: string, callback: IXtiEventCallback) {
        return this.builder.on(name, callback);
    }

    build() { return this.builder.build(); }
}