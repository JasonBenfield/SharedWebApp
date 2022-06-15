import { Button } from "../Html/ButtonView";
import { ButtonViewModel } from "../Html/ButtonViewModel";

export class DropdownButton extends Button {
    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        this.addCssName('dropdown-toggle');
    }
}