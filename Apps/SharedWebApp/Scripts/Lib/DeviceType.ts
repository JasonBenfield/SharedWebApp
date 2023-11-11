
export class DeviceType {
    readonly isIPhone: boolean;
    readonly isIPad: boolean;
    readonly isAndroid: boolean;
    readonly canFocus: boolean;

    constructor() {
        this.isIPhone = /(iPhone)/i.test(navigator.userAgent);
        this.isIPad = /(iPad)/i.test(navigator.userAgent);
        this.isAndroid = /(Android)/i.test(navigator.userAgent);
        this.canFocus = !this.isIPhone && !this.isIPad && !this.isAndroid;
    }
}