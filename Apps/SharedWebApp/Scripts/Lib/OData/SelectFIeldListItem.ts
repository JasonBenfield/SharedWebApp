import { ListItem } from "../Html/ListItem";
import { TextBlock } from "../Html/TextBlock";
import { SelectFieldListItemView } from "./SelectFieldListItemView";

export class SelectFieldListItem extends ListItem {
    protected readonly view: SelectFieldListItemView;
    private _isSelected = false;

    constructor(readonly fieldName: string, isActive: boolean, view: SelectFieldListItemView) {
        super(view);
        new TextBlock(fieldName, view.fieldName);
        if (isActive) {
            this.select();
        }
    }

    get isSelected() { return this._isSelected; }

    toggleSelect() {
        if (this._isSelected) {
            this.unselect();
        }
        else {
            this.select();
        }
    }

    private select() {
        this._isSelected = true;
        this.view.select();
    }

    private unselect() {
        this._isSelected = false;
        this.view.unselect();
    }
}