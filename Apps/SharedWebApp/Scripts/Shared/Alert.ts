import * as _ from 'lodash';
import { ContextualClass } from './ContextualClass';
import { BlockViewModel } from './Html/BlockViewModel';
import { Block } from './Html/Block';

export class Alert extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('alert');
    }

    private context = ContextualClass.info;

    setContext(context: ContextualClass) {
        let css = this.context.append('alert');
        this.replaceCssName(css, context.append('alert'));
        this.context = context;
    }
}