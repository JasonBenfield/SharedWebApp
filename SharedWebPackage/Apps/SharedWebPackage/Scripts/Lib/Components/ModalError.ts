import { DelayedAction } from "../DelayedAction";
import { ErrorModel } from "../ErrorModel";
import { EventSource } from "../Events";
import { BasicContainerView } from "../Views/BasicContainerView";
import { ModalErrorGroupView, ModalErrorListItemView, ModalErrorView } from "../Views/ModalError";
import { BasicComponent } from "./BasicComponent";
import { Command } from "./Command";
import { ListGroup } from "./ListGroup";
import { SingleComponentTypeContainer } from "./SingleComponentTypeContainer";
import { TextComponent } from "./TextComponent";

export class ModalError extends BasicComponent {
    protected readonly view: ModalErrorView;
    private readonly title: TextComponent;
    private readonly errorGroupComponentContainer: SingleComponentTypeContainer<ModalErrorGroupComponent, ModalErrorGroupView>;
    private readonly events = { errorSelected: null as ErrorModel };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(view: ModalErrorView) {
        super(view);
        this.title = this.addComponent(new TextComponent(view.title));
        this.errorGroupComponentContainer = this.addComponent(
            new SingleComponentTypeContainer(
                view.body,
                (parentView: BasicContainerView) => parentView.addView(ModalErrorGroupView),
                (componentView: ModalErrorGroupView) => new ModalErrorGroupComponent(componentView)
            )
        );
        this.view.when.closed.then(this.onClosed.bind(this));
        new Command(this.hide.bind(this)).add(this.view.okButton);
    }

    private onClosed() {
        this.clearErrors();
    }

    show(errors: ErrorModel[], caption: string = "") {
        const group = this.errorGroupComponentContainer.add();
        group.when.errorSelected.then(this.onErrorSelected.bind(this));
        group.load(caption, errors, this.errorGroupComponentContainer.getComponents().length === 1);
        if (errors.length === 1) {
            this.title.setText("An error occurred");
        }
        else {
            this.title.setText("Errors occurred");
        }
        this.view.showModal();
        new DelayedAction(() => this.view.okButton.setFocus(), 1000).execute();
    }

    hide() {
        this.clearErrors();
        this.view.hideModal();
    }

    private onErrorSelected(error: ErrorModel) {
        this.eventSource.events.errorSelected.invoke(error);
    }

    private clearErrors() {
        this.errorGroupComponentContainer.clearComponents();
    }

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}

export class ModalErrorGroupComponent extends BasicComponent {
    protected readonly view: ModalErrorGroupView
    private readonly caption: TextComponent;
    private readonly errors: ListGroup<ModalErrorListItem, ModalErrorListItemView>;

    private readonly events = { errorSelected: null as ErrorModel };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(view: ModalErrorGroupView) {
        super(view);
        this.caption = this.addComponent(new TextComponent(view.caption));
        this.errors = this.addComponent(new ListGroup(view.errorListView));
        this.errors.when.itemClicked.then(this.onErrorClicked.bind(this));
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
        const anyCaptions = errors.filter(e => Boolean(e.Caption)).length > 0;
        if (anyCaptions) {
            this.view.styleAsTwoTemplateColumns();
        }
        else {
            this.view.styleAsOneTemplateColumn();
        }
        this.errors.setItems(
            errors,
            (e, itemView) =>
                new ModalErrorListItem(e, itemView, anyCaptions)
        );
    }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}

export class ModalErrorListItem extends BasicComponent {
    constructor(readonly error: ErrorModel, view: ModalErrorListItemView, isCaptionVisible: boolean) {
        super(view);
        const captionTextComponent = this.addComponent(new TextComponent(view.caption));
        const messageTextComponent = this.addComponent(new TextComponent(view.message));
        captionTextComponent.setText(error.Caption);
        messageTextComponent.setText(error.Message);
        if (isCaptionVisible) {
            view.showCaption();
        }
        else {
            view.hideCaption();
        }
    }
}