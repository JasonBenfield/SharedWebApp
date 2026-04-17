import { FormLabelCss } from "../Bootstrap/FormGroupCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, ICompositeComponentView } from "./CompositeComponent";
import { GridCellView, GridRowViewMixin, GridViewMixin } from "./GridView";
import { IStyleableComponentView } from "./StyleableComponentView";
import { BaseTextLabelComponentView, BaseTextLabelComponentViewModel, TextLabelComponent, TextLabelComponentView, TextLabelComponentViewModel } from "./TextLabelComponent";

interface IFormGroupViewLayout<TValueView extends ComponentView> {
    captionCell: ComponentView & {
        caption: BaseTextLabelComponentView & IStyleableComponentView
    },
    valueCell: ComponentView & {
        value: TValueView
    }
};

export interface IFormGroupViewPublicLayout<TValueView extends ComponentView> {
    readonly caption: BaseTextLabelComponentView & IStyleableComponentView;
    readonly value: TValueView;
}

export type BaseFormGroupView<TValueView extends ComponentView> = ComponentView & { publicLayout: IFormGroupViewPublicLayout<TValueView> };

class FormGroupCss extends CssClass {
    protected buildCss() {
        return "form-group";
    }
}

class FormGroupCaptionCellCss extends CssClass {
    protected buildCss() {
        return "form-group-caption-cell";
    }
}

export class FormGroupView<TValueView extends ComponentView> extends GridRowViewMixin(BaseCompositeComponentView)<IFormGroupViewLayout<TValueView>, IFormGroupViewPublicLayout<TValueView>> implements ICompositeComponentView<IFormGroupViewLayout<TValueView>, IFormGroupViewPublicLayout<TValueView>> {

    constructor(valueView: TValueView) {
        const layout = {
            captionCell: GridCellView.block({
                caption: new TextLabelComponentView()
            }),
            valueCell: GridCellView.block({
                value: valueView
            })
        };
        super(
            "div",
            layout,
            l => {
                return {
                    caption: l.captionCell.caption,
                    value: l.valueCell.value
                };
            }
        );
        this.setCss(new FormGroupCss());
        layout.captionCell.setCss(new FormGroupCaptionCellCss());
        this.publicLayout.caption.setCss(new FormLabelCss());
    }
}

export interface IFormGroupViewModel<TValue extends ComponentViewModel> {
    caption: BaseTextLabelComponentViewModel,
    value: TValue
}

export class FormGroupViewModel<TValueVM extends ComponentViewModel> extends ComponentViewModel implements IFormGroupViewModel<TValueVM> {
    constructor(value: TValueVM) {
        super();
        this.value = value;
    }

    readonly caption = new TextLabelComponentViewModel();
    readonly value: TValueVM;
}

export class FormGroup<
    TValueVM extends ComponentViewModel,
    TValueView extends ComponentView,
    TValueComponent extends Component
> extends Component {
    constructor(
        viewModel: ComponentViewModel & IFormGroupViewModel<TValueVM>,
        view: BaseFormGroupView<TValueView>,
        createValueComponent: (vm: TValueVM, v: TValueView) => TValueComponent
    ) {
        super(viewModel, view);
        this.caption = new TextLabelComponent(viewModel.caption, view.publicLayout.caption);
        this.value = createValueComponent(viewModel.value, view.publicLayout.value);
        const value: any = this.value;
        if (value.id && typeof value.id === "string") {
            this.caption.forComponent(value);
        }
    }

    readonly caption: TextLabelComponent;
    readonly value: TValueComponent;

    setCaption(caption: string) {
        this.caption.text = caption;
    }

}

export type FormGroupContainerViewLayout<T> = {
    [K in keyof T]: BaseFormGroupView<ComponentView>;
}

class FormGroupContainerCss extends CssClass {
    protected buildCss() {
        return "form-group-grid";
    }
}

export class FormGroupContainerView<TLayout extends FormGroupContainerViewLayout<TLayout>> extends GridViewMixin(BaseCompositeComponentView)<TLayout, TLayout> {
    static create<TLayout extends FormGroupContainerViewLayout<TLayout>>(layout: TLayout) {
        return new FormGroupContainerView(layout).asLayout();
    }

    constructor(layout: TLayout) {
        super("div", layout, l => l);
        this.styleAsLayout();
        this.setCss(new FormGroupContainerCss());
        this.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
    }

    addFormGroup<T extends BaseFormGroupView<ComponentView>>(formGroup: T) {
        return this.addChildView(formGroup);
    }
}