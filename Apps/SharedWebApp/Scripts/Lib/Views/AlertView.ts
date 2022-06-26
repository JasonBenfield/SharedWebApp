import { ContextualClass } from '../ContextualClass';
import { BasicComponentView } from './BasicComponentView';
import { BlockView } from './BlockView';

export class AlertView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.setCss('alert-context', context ? context.append('alert') : '');
    }
}