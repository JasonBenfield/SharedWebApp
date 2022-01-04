import { ButtonListItemViewModel } from "./ButtonListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";
export declare class ButtonListGroupItemView extends ListGroupItemView {
    private readonly button;
    readonly clicked: IEventHandler<any>;
    constructor(vm?: ButtonListItemViewModel);
    enable(): void;
    disable(): void;
}
