import { AggregateComponent } from './AggregateComponent';
import { Heading5ViewModel } from './Heading5ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading5 extends HtmlContainerComponent {
    constructor(vm: Heading5ViewModel = new Heading5ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading5ViewModel;
}