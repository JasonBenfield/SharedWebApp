import { XtiEventOptionsBuilder } from "../XtiEventOptionsBuilder";

export class ViewEvents implements IViewEvents {
    private readonly builder = new XtiEventOptionsBuilder();

    constructor(
        private readonly source: any,
        private readonly setXtiEvent: (xtiEvent: IXtiEventBindingOptions) => void
    ) {
    }

    clear() {
        this.builder.clear();
        this.setXtiEvent(this.builder.build());
    }

    onClick(callback: (source, container?) => any, config?: (builder: IXtiEventOptionsBuilder) => void) {
        this.on('click', callback, config);
    }

    onFocus(callback: (source, container?) => any, config?: (builder: IXtiEventOptionsBuilder) => void) {
        this.on('focus', callback, config);
    }

    onBlur(callback: (source, container?) => any, config?: (builder: IXtiEventOptionsBuilder) => void) {
        this.on('blur', callback, config);
    }

    onSubmit(callback: (source, container?) => any, config?: (builder: IXtiEventOptionsBuilder) => void) {
        this.on('submit', callback, config);
    }

    on(name: string, callback: (source, container?) => any, config?: (builder: IXtiEventOptionsBuilder) => void) {
        let option = this.builder.option(name);
        this.builder.on(name, (view: any) => {
            callback(view, this.source);
        });
        option = this.builder.option(name);
        if (config) {
            config(option);
        }
        this.setXtiEvent(this.builder.build());
    }
}