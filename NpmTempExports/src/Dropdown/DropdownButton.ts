import { Button } from "../Html/Button";
import { ButtonViewModel } from "../Html/ButtonViewModel";

export class DropdownButton extends Button {
    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        vm.type('button');
        this.addCssName('dropdown-toggle');
    }
}