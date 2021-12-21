import { Any, FilteredArray } from "../Enumerable";
import { ErrorModel } from "../ErrorModel";
import { DefaultEvent } from "../Events";
import { ListGroup } from "../ListGroup/ListGroup";
import { ModalErrorGroupComponentView } from "./ModalErrorGroupComponentView";
import { ModalErrorListItem } from "./ModalErrorListItem";
import { ModalErrorListItemView } from "./ModalErrorListItemView";

export class ModalErrorGroupComponent {
    private readonly errors: ListGroup;

    private readonly _errorSelected = new DefaultEvent<ErrorModel>(this);
    readonly errorSelected = this._errorSelected.handler();

    constructor(private readonly view: ModalErrorGroupComponentView) {
        this.errors = new ListGroup(this.view.errors);
        this.errors.itemClicked.register(this.onErrorClicked.bind(this));
    }

    private onErrorClicked(errorListItem: ModalErrorListItem) {
        this._errorSelected.invoke(errorListItem.error);
    }

    load(caption: string, errors: ErrorModel[], isFirst: boolean) {
        if (isFirst) {
            this.view.hideHR();
        }
        else {
            this.view.showHR();
        }
        this.view.setCaption(caption);
        let anyCaptions = new Any(
            new FilteredArray(
                errors,
                e => Boolean(e.Caption)
            )
        ).value();
        this.errors.setItems(
            errors,
            (e: ErrorModel, itemView: ModalErrorListItemView) =>
                new ModalErrorListItem(e, itemView, anyCaptions)
        );
    }
}