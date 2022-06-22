import { Block } from "../Html/Block";
import { HtmlContainerComponent } from "../Html/HtmlContainerComponent";
import { ModalComponentViewModel } from "../Modal/ModalComponentViewModel";
import { FilterWorkflowView } from "./FilterWorkflowView";
import { SelectFieldsPanelView } from "./SelectFieldsPanelView";

export class ModalODataComponentView extends HtmlContainerComponent {
    readonly closed: IEventHandler<any>;

    readonly selectFieldsPanel: SelectFieldsPanelView;
    readonly filterWorkflow: FilterWorkflowView;

    protected readonly vm: ModalComponentViewModel;

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        let dialog = this.addContent(new Block());
        dialog.setRole('document');
        dialog.addCssName('modal-dialog');
        dialog.addCssName('modal-dialog-centered');
        dialog.addCssName('modal-dialog-scrollable');
        dialog.addCssName('modal-odata');
        const content = dialog.addContent(new Block());
        content.addCssName('modal-content');
        this.selectFieldsPanel = content.addContent(new SelectFieldsPanelView());
        this.filterWorkflow = content.addContent(new FilterWorkflowView());
        this.closed = this.vm.modalOptions.closed;
    }

    addToContainer(container: IAggregateComponent) {
        return container.addItem(this.vm, this);
    }

    insertIntoContainer(container: IAggregateComponent, index: number) {
        return container.insertItem(index, this.vm, this);
    }

    removeFromContainer(container: IAggregateComponent) {
        return container.removeItem(this);
    }

    setBackdrop(backdrop: boolean | 'static') {
        this.vm.modalOptions.backrop(backdrop);
    }

    showModal() {
        this.vm.modalOptions.command('show');
    }

    hideModal() {
        this.vm.modalOptions.command('hide');
    }
}