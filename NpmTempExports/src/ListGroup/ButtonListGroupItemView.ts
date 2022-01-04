import { Button } from "../Html/Button";
import { ButtonListItemViewModel } from "./ButtonListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";

export class ButtonListGroupItemView extends ListGroupItemView {
    private readonly button: Button;

    readonly clicked: IEventHandler<any>;

    constructor(vm: ButtonListItemViewModel = new ButtonListItemViewModel()) {
        super(vm);
        let css = vm.css();
        this.button = new Button(vm);
        this.button.clearCss();
        this.button.addCssName(css);
        this.clicked = this.button.clicked;
    }

    enable() {
        this.button.enable();
    }

    disable() {
        this.button.disable();
    }
}