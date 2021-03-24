import { AggregateComponent } from './AggregateComponent';
import { Heading4ViewModel } from './Heading4ViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Heading4 extends HtmlContainerComponent {
    constructor(vm: Heading4ViewModel = new Heading4ViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    protected readonly vm: Heading4ViewModel;
}