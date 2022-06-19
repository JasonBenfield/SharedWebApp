import { MappedArray } from "./Enumerable";

export class XtiEventOptionsBuilder {
    private options: IXtiEventBindingOptions = {};

    clear() { this.options = {}; }

    option(name: string): IXtiEventOptionsBuilder[] {
        return new MappedArray(
            this.options[name],
            o => new XtiEventOptionsBuilder2(this, o)
        ).value();
    }

    on(name: string, callback: IXtiEventCallback) {
        const optionsArr: IXtiEventOptions[] = this.options[name] || [];
        const options = { callback: callback, selector: null, preventDefault: false };
        optionsArr.push(options);
        this.options[name] = optionsArr;
        return new XtiEventOptionsBuilder2(this, options);
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