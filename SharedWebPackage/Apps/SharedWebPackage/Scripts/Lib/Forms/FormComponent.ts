import { BasicComponent } from "../Components/BasicComponent";
import { EventSource } from "../Events";
import { FormGroupContainerView } from "../Views/FormGroupContainerView";
import { FormView } from "../Views/FormView";
import { FormGroupContainer } from "./FormGroupContainer";

type Events = { submitted: boolean };

export class FormComponent extends BasicComponent {
    private readonly eventSource = new EventSource<Events>(this, { submitted: null as boolean });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: FormView) {
        super(view);
        view.addOffscreenSubmit();
        view.onSubmit()
            .preventDefault()
            .execute(this.onSubmit.bind(this))
            .subscribe();
    }

    validated() {
        this.view.styleAsValidated();
    }

    notValidated() {
        this.view.styleAsNotValidated();
    }

    private onSubmit() {
        this.eventSource.events.submitted.invoke();
    }

    addFormGroupContainer(view: FormGroupContainerView) {
        const container = new FormGroupContainer(view);
        this.addComponent(container);
        return container;
    }

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}