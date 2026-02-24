import { DelayedAction } from "../DelayedAction";
import { ContainerComponentView } from "./ContainerView";

export interface IMvvmOptions {
    debouncedViewModelChangedWait: number;
}

export class MvvmOptions {
    constructor(source?: Partial<IMvvmOptions>) {
        this._debouncedViewModelChangedWait =
            source && source.debouncedViewModelChangedWait !== undefined ?
                source.debouncedViewModelChangedWait :
                100;
    }

    private _debouncedViewModelChangedWait = 100;
    get debouncedViewModelChangedWait() { return this._debouncedViewModelChangedWait; }
    private set debouncedViewModelChangedWait(debouncedViewModelChangedWait: number) { this._debouncedViewModelChangedWait = debouncedViewModelChangedWait; }
}

export class MvvmPage {
    private static _instance: MvvmPage;

    static get() {
        return MvvmPage._instance || MvvmPage.create();
    }

    static create(options = new MvvmOptions()) {
        const instance = new MvvmPage(RootView.instance, options);
        MvvmPage._instance = instance;
        return instance;
    }

    private constructor(
        readonly view: RootView,
        readonly options: MvvmOptions
    ) {
    }

    async show() {
        this.view.addToDom(document.body);
        await DelayedAction.delay(this.options.debouncedViewModelChangedWait + 1);
        this.view.show();
    }
}

class RootView extends ContainerComponentView {
    static readonly instance = new RootView();

    private constructor() {
        super(() => document.createElement("div"));
        this.setAttributes({ "id": "mvvmRoot", "style": "display: content;" });
    }
}
