import { Button } from "../Html/ButtonView";
import { ButtonListItemViewModel } from "./ButtonListItemViewModel";
import { ListGroupItemView } from "./ListGroupItemView";

export class ButtonListGroupItemView extends ListGroupItemView {
    private readonly button: Button;

    constructor(vm: ButtonListItemViewModel = new ButtonListItemViewModel()) {
        super(vm);
        let css = vm.css();
        this.button = new Button(vm);
        this.button.clearCss();
        this.button.addCssName(css);
        vm.view = this;
    }

    enable() {
        this.button.enable();
    }

    disable() {
        this.button.disable();
    }
}