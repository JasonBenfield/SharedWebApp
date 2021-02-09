import { AggregateComponent } from './AggregateComponent';
import { Heading1ViewModel } from './Heading1ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading1 extends HtmlContainerComponent {
    constructor(vm: Heading1ViewModel = new Heading1ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading1ViewModel;
}