import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { FormGroupView } from "./FormGroup";
import { FormGroupContainerView } from "./FormGroupContainerView";
import { GridTemplateCss } from "./Grid";
import { GridListGroupItemView, GridListGroupView } from "./ListGroup";
import { ViewConstructor } from "./Types";

export class FormGroupGridListGroupView<TItemView extends GridListGroupItemView> extends FormGroupView {
    private listView: GridListGroupView<TItemView>;

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
        this.listView.setTemplateColumns(...columns);
    }

    addListGroupItem() {
        return this.listView.addListGroupItem();
    }

    addListGroupItems(howMany: number) {
        return this.listView.addListGroupItems(howMany);
    }
}