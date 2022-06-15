import { HtmlComponent } from "./HtmlComponent";
import { AggregateComponent } from './AggregateComponent';
import { LabelViewModel } from './LabelViewModel';

export class LabelView extends HtmlComponent {
    protected readonly vm: LabelViewModel;
    readonly content: AggregateComponent;

    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
        this.content = new AggregateComponent(this.vm.content);
    }

    protected setAttr: (config: (attr: ILabelAttributes) => void) => void;

    setFor(forTarget: string) {
        this.setAttr(attr => attr.for = forTarget);
    }

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }
}