
export interface IMvvmOptions {
    debouncedViewModelChangedWait: number;
}

export class MvvmOptions {
    private static _value = new MvvmOptions();

    static get value() { return MvvmOptions._value; }

    private static hasConfigured = false;

    static configure(source?: Partial<IMvvmOptions>) {
        if (MvvmOptions.hasConfigured) {
            throw new Error("MVVM Options have already been configured.");
        }
        MvvmOptions._value = new MvvmOptions(source);
        MvvmOptions.hasConfigured = true;
    }

    private constructor(source?: Partial<IMvvmOptions>) {
        this._debouncedViewModelChangedWait =
            source && source.debouncedViewModelChangedWait !== undefined ?
                source.debouncedViewModelChangedWait :
                50;
    }

    private _debouncedViewModelChangedWait = 50;
    get debouncedViewModelChangedWait() { return this._debouncedViewModelChangedWait; }
    private set debouncedViewModelChangedWait(debouncedViewModelChangedWait: number) { this._debouncedViewModelChangedWait = debouncedViewModelChangedWait; }
}