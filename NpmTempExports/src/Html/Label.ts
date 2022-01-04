import { HtmlComponent } from "./HtmlComponent";
import { AggregateComponent } from './AggregateComponent';
import { LabelViewModel } from './LabelViewModel';

export class Label extends HtmlComponent {
    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
    }
    protected readonly vm: LabelViewModel;
    readonly content = new AggregateComponent(this.vm.content);

    setFor(forTarget: string) {
        this.vm.forTarget(forTarget);
    }

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }
}