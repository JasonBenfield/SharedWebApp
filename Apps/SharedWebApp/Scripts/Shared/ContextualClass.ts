export class ContextualClass {
    public static readonly default = new ContextualClass('default');
    public static readonly success = new ContextualClass('success');
    public static readonly info = new ContextualClass('info');
    public static readonly warning = new ContextualClass('warning');
    public static readonly danger = new ContextualClass('danger');
    public static readonly primary = new ContextualClass('primary');
    public static readonly secondary = new ContextualClass('secondary');
    public static readonly light = new ContextualClass('light');
    public static readonly dark = new ContextualClass('dark');

    private constructor(private readonly value: string) {
    }

    get isDefault() { return this.equals(ContextualClass.default); }
    get isSuccess() { return this.equals(ContextualClass.success); }
    get isInfo() { return this.equals(ContextualClass.info); }
    get isWarning() { return this.equals(ContextualClass.warning); }
    get isDanger() { return this.equals(ContextualClass.danger); }
    get isPrimary() { return this.equals(ContextualClass.primary); }
    get isSecondary() { return this.equals(ContextualClass.secondary); }
    get isLight() { return this.equals(ContextualClass.light); }
    get isDark() { return this.equals(ContextualClass.dark); }

    append(prefix: string) {
        let dash = prefix.lastIndexOf('-') === prefix.length - 1 ? '' : '-';
        return `${prefix}${dash}${this.value}`;
    }

    equals(other: ContextualClass | string) {
        if (other) {
            if (typeof other === 'string') {
                return this.value === other;
            }
            return this.value === other.value;
        }
        return false;
    }

    toString() {
        return this.value;
    }
}