import { BlockView } from './BlockView';
import { ContextualClass } from '../ContextualClass';
import { IContainerView } from './Types';

export class AlertView extends BlockView {
    constructor(container: IContainerView) {
        super(container);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.setCss('alert-context', context ? context.append('alert') : '');
    }
}