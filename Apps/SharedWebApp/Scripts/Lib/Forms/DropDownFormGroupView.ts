import { BlockViewModel } from "../Html/BlockViewModel";
import { Select } from "../Html/Select";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";

export class DropDownFormGroupView<TValue> extends SimpleFieldFormGroupView {
    readonly select: Select<TValue>;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.select = this.inputGroup.insertContent(0, new Select<TValue>());
        this.select.addCssName('form-control');
    }
}