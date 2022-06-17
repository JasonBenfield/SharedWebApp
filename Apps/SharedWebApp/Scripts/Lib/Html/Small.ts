import { AggregateComponent } from './AggregateComponent';
import { HtmlComponent } from "./HtmlComponent";
import { SmallViewModel } from './SmallViewModel';

export class Small extends HtmlComponent {
    constructor(vm: SmallViewModel = new SmallViewModel()) {
        super(vm);
    }

    protected readonly vm: SmallViewModel;
    readonly content = new AggregateComponent(this.vm.content);

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }
}