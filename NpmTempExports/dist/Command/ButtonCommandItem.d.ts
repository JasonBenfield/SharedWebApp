import { ButtonViewModel } from "../Html/ButtonViewModel";
import { Button } from "../Html/Button";
import { FaIcon } from "../FaIcon";
import { ICommandItem } from "./CommandItem";
export declare class ButtonCommandItem extends Button implements ICommandItem {
    static offscreenSubmit(vm: ButtonViewModel): ButtonCommandItem;
    readonly executeRequested: import("../Events").DefaultEventHandler<any>;
    readonly icon: FaIcon;
    private readonly textSpan;
    private active;
    protected readonly vm: ButtonViewModel;
    constructor(vm?: ButtonViewModel);
    positionIconRight(): void;
    setText(text: string): void;
    setActive(): void;
    setInactive(): void;
    private updateActiveCss;
    changeTypeToSubmit(): void;
    makeOffscreenSubmit(): void;
}
