import { IComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponent, CompositeComponentView } from "./CompositeComponent";
import { ITextComponentView, TextComponentView, TextComponentViewModel } from "./TextComponent";

export interface IReadonlyFormGroupView {
    readonly caption: ITextComponentView;
    readonly value: ITextComponentView;
}

function createLayout() {
    return {
        captionContainer: CompositeComponentView.block()
            .compose({
                caption: TextComponentView.block()
            }),
        valueContainer: CompositeComponentView.block()
            .compose({
                value: TextComponentView.block()
            })
    };
}

function toPublicLayout(layout: ReturnType<typeof createLayout>) {
    const formGroup: IReadonlyFormGroupView = {
        caption: layout.captionContainer.caption,
        value: layout.valueContainer.value
    };
    return formGroup;
}

export class ReadonlyFormGroupView {
    static create() {
        return CompositeComponentView.block().compose(createLayout(), toPublicLayout);
    }
}

export interface IReadonlyFormGroupViewModel {
    caption: TextComponentViewModel,
    value: TextComponentViewModel
}

export class ReadonlyFormGroupViewModel extends ComponentViewModel {
    readonly caption= new TextComponentViewModel();
    readonly value = new TextComponentViewModel();

    createComponent(view: IComponentView) {
        return new ReadonlyFormGroup(this, view);
    }
}

export class ReadonlyFormGroup extends CompositeComponent<ComponentViewModel & IReadonlyFormGroupViewModel> {
    setCaption(caption: string) {
        this.composite.caption.text = caption;
    }

    setValue(value: string) {
        this.composite.value.text = value;
    }
}