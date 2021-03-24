import { ModalErrorComponentViewModel } from './ModalErrorComponentViewModel';
import { Command } from '../Command/Command';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { ErrorModel } from '../ErrorModel';
import { ModalErrorItemViewModel } from './ModalErrorItemViewModel';
import { Any, FilteredArray } from '../Enumerable';
import { CssClass } from '../CssClass';
import { ContextualClass } from '../ContextualClass';

export class ModalErrorComponent implements IComponent {
    constructor(
        private readonly vm: ModalErrorComponentViewModel = new ModalErrorComponentViewModel()
    ) {
        this.vm.modalOptions.closed.register(this.onClosed.bind(this));
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

    readonly errorSelected = this.vm.errorSelected;

    private onClosed() {
        this.vm.errors([]);
    }

    show(errors: ErrorModel[], caption: string = '') {
        let errorVM = new ModalErrorViewModel();
        errorVM.caption(caption);
        let anyCaptions = new Any(
            new FilteredArray(
                errors,
                e => Boolean(e.Caption)
            )
        ).value();
        let captionCss = new CssClass();
        let messageCss = new CssClass();
        if (anyCaptions) {
            captionCss.addName('col-3');
            messageCss.addName('col');
        }
        let itemVMs: ModalErrorItemViewModel[] = [];
        for (let error of errors) {
            let itemVM = new ModalErrorItemViewModel(error);
            itemVM.captionCss(captionCss.toString());
            itemVM.messageCss(messageCss.toString());
            itemVMs.push(itemVM);
        }
        errorVM.errors(itemVMs);
        this.vm.errors.splice(0, 0, errorVM);
        if (this.vm.errors().length === 1) {
            this.vm.title('An error occurred');
        }
        else {
            this.vm.title('Errors occurred');
        }
        this.vm.modalOptions.command('show');
    }

    readonly okCommand = new Command(this.ok.bind(this))
        .configure(c => {
            c.addButton(this.vm.okCommand)
                .configure(b => {
                    b.setText('OK');
                    b.setContext(ContextualClass.danger);
                });
        });

    private ok() {
        this.vm.errors([]);
        this.vm.modalOptions.command('hide');
    }
}