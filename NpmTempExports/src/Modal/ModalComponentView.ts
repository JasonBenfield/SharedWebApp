import { Block } from '../Html/Block';
import { HtmlContainerComponent } from '../Html/HtmlContainerComponent';
import { ModalComponentViewModel } from './ModalComponentViewModel';

export class ModalComponentView extends HtmlContainerComponent {
    readonly closed: IEventHandler<any>;

    readonly header: Block;
    readonly body: Block;
    readonly footer: Block;

    protected readonly vm: ModalComponentViewModel;

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        let dialog = this.addContent(new Block());
        dialog.setRole('document');
        dialog.addCssName('modal-dialog');
        dialog.addCssName('modal-dialog-centered');
        let content = dialog.addContent(new Block());
        content.addCssName('modal-content');
        this.header = content.addContent(new Block());
        this.header.addCssName('modal-header');
        this.body = content.addContent(new Block());
        this.body.addCssName('modal-body');
        this.footer = content.addContent(new Block());
        this.footer.addCssName('modal-footer');
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