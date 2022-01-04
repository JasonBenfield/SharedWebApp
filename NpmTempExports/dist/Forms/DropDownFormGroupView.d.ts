import { BlockViewModel } from "../Html/BlockViewModel";
import { Select } from "../Html/Select";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";
export declare class DropDownFormGroupView<TValue> extends SimpleFieldFormGroupView {
    readonly select: Select<TValue>;
    constructor(vm?: BlockViewModel);
}
