import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { FormGroupView } from "./FormGroup";
import { FormGroupContainerView } from "./FormGroupContainerView";
import { GridTemplateCss } from "./Grid";
import { GridListGroupItemView, GridListGroupView } from "./ListGroup";
import { ViewConstructor } from "./Types";

export class FormGroupGridListGroupView<TItemView extends GridListGroupItemView> extends FormGroupView {
    private listView: GridListGroupView<TItemView> | null = null;

    static addTo<T extends GridListGroupItemView>(container: FormGroupContainerView, itemCtor: ViewConstructor<T>) {
        const formGroup = container.addFormGroup(FormGroupGridListGroupView<T>);
        formGroup.setItemViewType(itemCtor);
        return formGroup;
    }

    constructor(container: BasicComponentView) {
        super(container);
    }

    protected setItemViewType(itemViewCtor: ViewConstructor<TItemView>) {
        this.listView = this.valueCell
            .addView(BlockView)
            .configure(b => b.styleAsFormControl())
            .addGridListGroup(itemViewCtor);
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        if (this.listView) {
            this.listView.setTemplateColumns(...columns);
        }
    }

    addListGroupItem() {
        return this.listView ? this.listView.addListGroupItem() : null;
    }

    addListGroupItems(howMany: number) {
        return this.listView ? this.listView.addListGroupItems(howMany) : null;
    }
}