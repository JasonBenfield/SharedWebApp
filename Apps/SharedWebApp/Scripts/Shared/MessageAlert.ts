import * as _ from 'lodash';
import { ContextualClass } from './ContextualClass';
import { DefaultEvent } from './Events';
import { BlockViewModel } from './Html/BlockViewModel';
import { HtmlComponent } from './Html/HtmlComponent';
import { TextBlock } from './Html/TextBlock';
import { Alert } from './Alert';

export class MessageAlert extends HtmlComponent {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('alert');
    }

    protected readonly vm: BlockViewModel;
    private readonly alert = new Alert(this.vm);
    private readonly textBlock = new TextBlock().addToContainer(this.alert.content);
    private _message: string;

    get message() {
        return this._message;
    }

    get hasMessage() {
        return Boolean(this._message);
    }

    private readonly _messageChanged = new DefaultEvent<string>(this);
    readonly messageChanged = this._messageChanged.handler();

    clear() {
        this.setMessage('');
    }

    success(message: string) {
        this.alert.setContext(ContextualClass.success);
        this.setMessage(message);
    }

    info(message: string) {
        this.alert.setContext(ContextualClass.info);
        this.setMessage(message);
    }

    async infoAction(message: string, a: () => Promise<any>) {
        this.info(message);
        try {
            await a();
        }
        finally {
            this.clear();
        }
    }

    warning(message: string) {
        this.alert.setContext(ContextualClass.warning);
        this.setMessage(message);
    }

    danger(message: string) {
        this.alert.setContext(ContextualClass.danger);
        this.setMessage(message);
    }

    private setMessage(message: string) {
        this._message = _.trim(message);
        this._messageChanged.invoke(this._message);
        if (this._message) {
            this.updateVmMessage(this._message);
        }
        this.debouncedSetMessage(this._message);
    }

    private debouncedSetMessage = _.debounce((message: string) => {
        this.updateVmMessage(message);
    }, 500);

    private updateVmMessage(message: string) {
        this.textBlock.setText(message);
        if (message) {
            this.show();
        }
        else {
            this.hide();
        }
    }
}