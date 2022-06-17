import { AggregateComponent } from './AggregateComponent';
import { Heading3ViewModel } from './Heading3ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading3 extends HtmlContainerComponent {
    constructor(vm: Heading3ViewModel = new Heading3ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading3ViewModel;
}