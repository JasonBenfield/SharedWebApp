import { SpanViewModel } from './SpanViewModel';
import { AggregateComponent } from './AggregateComponent';
import { HtmlContainerComponent } from './HtmlContainerComponent';

export class Span extends HtmlContainerComponent {
    constructor(vm: SpanViewModel = new SpanViewModel()) {
        super(vm, new AggregateComponent(vm.content));
    }

    readonly vm: SpanViewModel;
}