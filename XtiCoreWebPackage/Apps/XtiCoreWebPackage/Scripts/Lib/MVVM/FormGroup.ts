import { FormLabelCss } from "../Bootstrap/FormGroupCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, IPublicLayoutView } from "./CompositeComponent";
import { GridCellContainerView, GridRowViewMixin, GridViewMixin } from "./GridView";
import { IStyleableComponentView, StyleableComponentView } from "./StyleableComponentView";
import { BaseTextLabelComponentView, BaseTextLabelComponentViewModel, TextLabelComponent, TextLabelComponentView, TextLabelComponentViewModel } from "./TextLabelComponent";

export interface IFormGroupViewPublicLayout<TValueView extends ComponentView> {
    readonly caption: BaseTextLabelComponentView & IStyleableComponentView;
    readonly value: TValueView;
}

export type BaseFormGroupView<TValueView extends ComponentView> = ComponentView & IPublicLayoutView<IFormGroupViewPublicLayout<TValueView>>;

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

export class FormGroupView<TValueView extends ComponentView>
    extends GridRowViewMixin(StyleableComponentView)
    implements IPublicLayoutView<IFormGroupViewPublicLayout<TValueView>> {

    constructor(valueView: TValueView) {
        super();
        this.setCss(new FormGroupCss());
        this.addLayout(this.layout);
        this.layout.valueCell.addChildView(valueView);
        this.layout.captionCell.setCss(new FormGroupCaptionCellCss());
        const captionView = this.layout.captionCell.addChildView(new TextLabelComponentView());
        this.publicLayout = {
            caption: captionView,
            value: valueView
        }
        this.publicLayout.caption.setCss(new FormLabelCss());
    }

    private readonly layout = {
        captionCell: GridCellContainerView.block(),
        valueCell: GridCellContainerView.block()
    };

    readonly captionCell = this.layout.captionCell;
    readonly valueCell = this.layout.valueCell;

    readonly publicLayout: IFormGroupViewPublicLayout<TValueView>;
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
        protected readonly viewModel: ComponentViewModel & IFormGroupViewModel<TValueVM>,
        view: BaseFormGroupView<TValueView>,
        createValueComponent: (vm: TValueVM, v: TValueView) => TValueComponent
    ) {
        super(viewModel, view);
        const layout = this.addLayout({
            caption: new TextLabelComponent(viewModel.caption, view.publicLayout.caption),
            value: createValueComponent(viewModel.value, view.publicLayout.value)
        });
        this.caption = layout.caption;
        this.value = layout.value;
        const value: any = this.value;
        if (value.id && typeof value.id === "string") {
            this.caption.forComponent(value);
        }
    }

    readonly caption: TextLabelComponent;
    readonly value: TValueComponent;

    getCaption() { return this.caption.text; }

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

    declare asLayout: () => FormGroupContainerView<TLayout> & TLayout;

    addFormGroup<T extends BaseFormGroupView<ComponentView>>(formGroup: T) {
        return this.addChildView(formGroup);
    }
}