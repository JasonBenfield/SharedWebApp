
export class ViewEvents implements IViewEvents {
    private bindingOptions: IXtiEventBindingOptions = {};

    constructor(
        private readonly source: any,
        private readonly setXtiEvent: (xtiEvent: IXtiEventBindingOptions) => void
    ) {
    }

    clear() {
        this.bindingOptions = {};
        this.setXtiEvent(this.bindingOptions);
    }

    onClick(callback: (source, container?) => any, config?: (options: IXtiEventOptions) => void) {
        this.on('click', callback, config);
    }

    onFocus(callback: (source, container?) => any, config?: (options: IXtiEventOptions) => void) {
        this.on('focus', callback, config);
    }

    onBlur(callback: (source, container?) => any, config?: (options: IXtiEventOptions) => void) {
        this.on('blur', callback, config);
    }

    onSubmit(callback: (source, container?) => any, config?: (options: IXtiEventOptions) => void) {
        this.on('submit', callback, config);
    }

    on(name: string, callback: (source, container?) => any, config?: (options: IXtiEventOptions) => void) {
        const optionsArr: IXtiEventOptions[] = this.bindingOptions[name] || [];
        const options: IXtiEventOptions = { callback: callback, selector: null, preventDefault: false };
        optionsArr.push(options);
        this.bindingOptions[name] = optionsArr;
        if (config) {
            config(options);
        }
        this.setXtiEvent(this.bindingOptions);
    }
}