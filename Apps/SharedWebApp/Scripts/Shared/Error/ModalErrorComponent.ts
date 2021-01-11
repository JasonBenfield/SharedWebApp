import { ModalErrorComponentViewModel } from './ModalErrorComponentViewModel';
import { Command } from '../Command';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { ErrorModel } from '../ErrorModel';
import { singleton } from 'tsyringe';
import { ModalErrorItemViewModel } from './ModalErrorItemViewModel';
import { Any, FilteredArray } from '../Enumerable';
import { CssClass } from '../CssClass';

@singleton()
export class ModalErrorComponent {
    constructor(
        private readonly vm: ModalErrorComponentViewModel
    ) {
        this.okCommand.setText('OK');
        this.okCommand.makeDanger();
        this.vm.modalOptions.closed.register(this.onClosed.bind(this));
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

    readonly okCommand = new Command(this.vm.okCommand, this.ok.bind(this));

    private ok() {
        this.vm.errors([]);
        this.vm.modalOptions.command('hide');
    }
}