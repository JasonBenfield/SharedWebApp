import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { SelectFieldListItemView } from "./SelectFieldListItemView";

export class SelectFieldListItem extends BasicComponent {
    protected readonly view: SelectFieldListItemView;
    private _isSelected = false;

    constructor(readonly fieldName: string, isActive: boolean, view: SelectFieldListItemView) {
        super(view);
        new TextComponent(view.fieldName).setText(fieldName);
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