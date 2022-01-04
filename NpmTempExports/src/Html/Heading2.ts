import { AggregateComponent } from './AggregateComponent';
import { Heading2ViewModel } from './Heading2ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading2 extends HtmlContainerComponent {
    constructor(vm: Heading2ViewModel = new Heading2ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading2ViewModel;
}