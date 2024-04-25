
export class DeviceType {
    readonly isIPhone: boolean;
    readonly isIPad: boolean;
    readonly isAndroid: boolean;
    private _canFocus: boolean;

    static readonly instance = new DeviceType();

    private constructor() {
        this.isIPhone = /(iPhone)/i.test(navigator.userAgent);
        this.isIPad = /(iPad)/i.test(navigator.userAgent);
        this.isAndroid = /(Android)/i.test(navigator.userAgent);
        this._canFocus = !this.isIPhone && !this.isIPad && !this.isAndroid;
    }

    get canFocus() { return this._canFocus; }

    set canFocus(canFocus: boolean) { this._canFocus = canFocus; }
}