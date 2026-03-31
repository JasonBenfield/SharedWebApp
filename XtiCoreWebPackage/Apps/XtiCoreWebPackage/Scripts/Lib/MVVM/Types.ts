export interface IHtmlAttributes {
    id?: string;
    name?: string;
    title?: string;
    "class"?: string;
    role?: string;
    draggable?: string;
    opacity?: string;
}

export interface ITitleView {
    setTitle(title: string): void;
}

export interface ITitleViewModel {
    get title(): string;
    set title(title: string);
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface IFormattable {
    format(): string;
}

export interface IValueComponent<TValue> {
    getValue(): TValue;
    setValue(value: TValue): void;
}
