import { FilteredArray } from "../Enumerable";
import { ErrorModel } from "../ErrorModel";
import { EventSource } from "../Events";
import { ModalErrorGroupView, ModalErrorListItemView, ModalErrorView } from "../Views/ModalError";
import { BasicComponent } from "./BasicComponent";
import { Command } from "./Command";
import { ListGroup } from "./ListGroup";
import { TextComponent } from "./TextComponent";

export class ModalError extends BasicComponent {
    protected readonly view: ModalErrorView;
    private readonly title: TextComponent;

    private readonly events = { errorSelected: null as ErrorModel };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(view: ModalErrorView) {
        super(view);
        this.title = new TextComponent(view.title);
        this.view.when.closed.then(this.onClosed.bind(this));
        new Command(this.hide.bind(this)).add(this.view.okButton);
    }

    private onClosed() {
        this.clearErrors();
    }

    show(errors: ErrorModel[], caption: string = '') {
        const group = new ModalErrorGroupComponent(this.view.errorGroup());
        group.when.errorSelected.then(this.onErrorSelected.bind(this));
        group.load(caption, errors, !this.anyComponents());
        this.addComponent(group);
        if (errors.length === 1) {
            this.title.setText('An error occurred');
        }
        else {
            this.title.setText('Errors occurred');
        }
        this.view.showModal();
    }

    hide() {
        this.clearErrors();
        this.view.hideModal();
    }

    private onErrorSelected(error: ErrorModel) {
        this.eventSource.events.errorSelected.invoke(error);
    }

    private clearErrors() {
        this.clearComponents();
    }
}

export class ModalErrorGroupComponent extends BasicComponent {
    protected readonly view: ModalErrorGroupView
    private readonly caption: TextComponent;
    private readonly errors: ListGroup;

    private readonly events = { errorSelected: null as ErrorModel };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(view: ModalErrorGroupView) {
        super(view);
        this.caption = new TextComponent(view.caption);
        this.errors = new ListGroup(view.errors);
        this.errors.registerItemClicked(this.onErrorClicked.bind(this));
    }

    private onErrorClicked(errorListItem: ModalErrorListItem) {
        this.eventSource.events.errorSelected.invoke(errorListItem.error);
    }

    load(caption: string, errors: ErrorModel[], isFirst: boolean) {
        if (isFirst) {
            this.view.hideHR();
        }
        else {
            this.view.showHR();
        }
        this.caption.setText(caption);
        const anyCaptions = new FilteredArray(
            errors,
            e => Boolean(e.Caption)
        ).toEnumerableArray().any();
        this.errors.setItems(
            errors,
            (e: ErrorModel, itemView: ModalErrorListItemView) =>
                new ModalErrorListItem(e, itemView, anyCaptions)
        );
    }
}

export class ModalErrorListItem extends BasicComponent {
    constructor(readonly error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean) {
        super(view);
        new TextComponent(view.caption).setText(error.Caption);
        new TextComponent(view.message).setText(error.Message);
        if (isCaptionVisible) {
            view.showCaption();
        }
        else {
            view.hideCaption();
        }
    }
}