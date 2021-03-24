import { Button } from "../Html/Button";
import { ButtonListItemViewModel } from "./ButtonListItemViewModel";
import { ListGroupItem } from "./ListGroupItem";

export class ButtonListGroupItem extends ListGroupItem {
    constructor(vm: ButtonListItemViewModel) {
        super(vm);
        let css = vm.css();
        this.button = new Button(vm);
        this.button.clearCss();
        this.button.addCssName(css);
        this.clicked = this.button.clicked;
    }

    private readonly button: Button;

    readonly clicked: IEventHandler<any>;

    enable() {
        this.button.enable();
    }

    disable() {
        this.button.disable();
    }
}