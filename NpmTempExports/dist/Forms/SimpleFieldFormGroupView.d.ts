import { BlockViewModel } from "../Html/BlockViewModel";
import { FormGroupView } from "../Html/FormGroupView";
import { InputGroup } from "../Html/InputGroup";
import { ListGroupView } from "../ListGroup/ListGroupView";
export declare class SimpleFieldFormGroupView extends FormGroupView {
    readonly alertList: ListGroupView;
    private readonly dropdown;
    readonly inputGroup: InputGroup;
    constructor(vm?: BlockViewModel);
    showDropDown(): void;
    hideDropDown(): void;
}
