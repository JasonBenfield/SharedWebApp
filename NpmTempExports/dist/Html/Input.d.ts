import { HtmlComponent } from "./HtmlComponent";
import { ContextualClass } from "../ContextualClass";
import { InputViewModel } from "./InputViewModel";
export declare class Input extends HtmlComponent {
    private readonly _changed;
    readonly changed: import("../Events").DefaultEventHandler<string>;
    protected readonly vm: InputViewModel;
    private border;
    constructor(vm?: InputViewModel);
    private onValueChanged;
    enable(): void;
    disable(): void;
    clearAutocomplete(): void;
    setAutocompleteOff(): void;
    setAutocompleteNewPassword(): void;
    private setAutocomplete;
    getValue(): string;
    setValue(value: string): void;
    setBorder(border: ContextualClass): void;
    private getBorderCss;
    setMaxLength(maxLength: number): void;
    setType(type: 'text' | 'hidden' | 'password' | 'date' | 'number' | 'time'): void;
    hasFocus(): boolean;
    setFocus(): void;
    blur(): void;
}
