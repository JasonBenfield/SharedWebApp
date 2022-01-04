import { BlockViewModel } from "../Html/BlockViewModel";
import { Input } from "../Html/Input";
import { SimpleFieldFormGroupView } from "./SimpleFieldFormGroupView";
export declare class InputFormGroupView extends SimpleFieldFormGroupView {
    readonly input: Input;
    constructor(vm?: BlockViewModel);
}
