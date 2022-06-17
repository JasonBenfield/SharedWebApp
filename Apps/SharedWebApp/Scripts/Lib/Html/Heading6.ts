import { AggregateComponent } from './AggregateComponent';
import { Heading6ViewModel } from './Heading6ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading6 extends HtmlContainerComponent {
    constructor(vm: Heading6ViewModel = new Heading6ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading6ViewModel;
}