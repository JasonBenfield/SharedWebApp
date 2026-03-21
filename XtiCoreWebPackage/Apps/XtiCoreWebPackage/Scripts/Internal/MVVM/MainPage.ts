import { BackgroundCss } from "../../Lib/Bootstrap/BackgroundCss";
import { ContainerCss } from "../../Lib/Bootstrap/ContainerCss";
import { ContextualClass } from "../../Lib/Bootstrap/ContextualClass";
import { DisplayCss } from "../../Lib/Bootstrap/DisplayCss";
import { FlexCss } from "../../Lib/Bootstrap/FlexCss";
import { HeightCss } from "../../Lib/Bootstrap/HeightCss";
import { OverflowCss } from "../../Lib/Bootstrap/OverflowCss";
import { PaddingCss } from "../../Lib/Bootstrap/PaddingCss";
import { FormattedNumber } from "../../Lib/FormattedNumber";
import { ButtonCommandView, Command, CommandOptionsBuilder, CommandViewModel } from "../../Lib/MVVM/Command";
import { ComponentView } from "../../Lib/MVVM/ComponentView";
import { ComponentViewModel } from "../../Lib/MVVM/ComponentViewModel";
import { CompositeComponentBuilder, CompositeComponentView, CompositeComponentViewBuilder } from "../../Lib/MVVM/CompositeComponent";
import { ContainerComponent } from "../../Lib/MVVM/ContainerComponent";
import { InputComponentView } from "../../Lib/MVVM/InputComponent";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../../Lib/MVVM/ReadonlyFormGroup";
import { StyleableComponentViewMixin } from "../../Lib/MVVM/StyleableComponentView";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";
import { TransformedInputComponent, TransformedInputComponentViewModel, TransformedNumberInput } from "../../Lib/MVVM/TransformedInputComponent";
import { AppHost } from "../AppHost";

class MainPage {

    constructor() {
        const pageView = new MainPageView();
        const pageViewModel = new MainPageViewModel();

        const formGroup = new ReadonlyFormGroup(pageViewModel.formGroup, pageView.formGroup);
        formGroup.setCaption("Caption 1");
        formGroup.setValue("Value 1");
        const textListComponent = new ListComponent(
            new ListComponentOptionsBuilder(pageViewModel.textList, pageView.textList)
                .withHeaderFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => new TextComponentView(createItemElement))
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withFooterFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => new TextComponentView(createItemElement))
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withItemFactory(() => {
                    return new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => {
                            const itemView = new TextComponentView(createItemElement);
                            return itemView;
                        })
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView));
                })
                .build(new TextViewModelUpdater())
        );
        textListComponent.header.text = "Text List Header";
        textListComponent.setItems("Test 1", "Test 2", "Test 3");
        textListComponent.footer.text = "Text List Footer";
        const compositeListComponent = new ListComponent(
            new ListComponentOptionsBuilder(pageViewModel.compositeList, pageView.compositeList)
                .withHeaderFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => new TextComponentView(createItemElement))
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withFooterFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => new TextComponentView(createItemElement))
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                    .withView((createItemElement) => new CompositeComponentViewBuilder(createItemElement).build({
                        id: TextComponentView.label(),
                        value: new TextComponentView()
                    }).asLayout())
                    .withComponent((itemVM, itemView) => {
                        return new CompositeComponentBuilder(itemVM)
                            .view(itemView)
                            .factory({
                                id: (vm, view) => new TextComponent(vm, view),
                                value: (vm, view) => new TextComponent(vm, view)
                            })
                            .build();
                    })
                )
                .build(new TestItemViewModelUpdater())
        );
        compositeListComponent.header.text = "Composite List Header";
        compositeListComponent.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"), new TestItem(4, "Test 4"));
        compositeListComponent.footer.text = "Composite List Footer";
        const command = new Command(
            new CommandOptionsBuilder(pageViewModel.button)
                .addView(pageView.buttons.button)
                .setAction(() => {
                    alert("Testing");
                })
                .build()
        );
        command.setText("Test Button");
        const input = new TransformedInputComponent(
            pageViewModel.input,
            pageView.input,
            new TransformedNumberInput()
                .setNumberOfDecimals(2)
                .setFormatString(FormattedNumber.currencyFormatString)
        );
        const inputResult = new TextComponent(pageViewModel.inputResult, pageView.inputResult);
        input.when.valueChanged.then(evt => {
            inputResult.text = evt.detail.toLocaleString();
        });

        const pageComponent = new ContainerComponent(new ComponentViewModel(), pageView);
        pageComponent.addComponents(
            formGroup,
            textListComponent,
            compositeListComponent,
            command,
            input,
            inputResult
        );
        AppHost.value.show(
            pageView,
            pageComponent
        );
    }
}

class MainPageView extends StyleableComponentViewMixin(ComponentView) {
    constructor() {
        super();
        this.setCss(DisplayCss.flex());
        this.setCss(new FlexCss().column());
        this.setCss(HeightCss.fill());
        this.addLayout(this.layout);
        this.layout.content.setCss(new FlexCss().grow(1));
        this.layout.content.setCss(OverflowCss.auto());
        this.layout.content.container.setCss(new ContainerCss());
        this.layout.toolbar.setCss(BackgroundCss.gradient(ContextualClass.secondary).subtle());
        this.layout.toolbar.container.setCss(new ContainerCss());
        this.layout.toolbar.container.setCss(PaddingCss.xs(3));
        this.layout.toolbar.container.text.setText("Toolbar");
    }

    private readonly layout = {
        content: CompositeComponentView.block({
            container: CompositeComponentView.block({
                formGroup: new ReadonlyFormGroupView(),
                textList: ListComponentView.unorderedList(),
                compositeList: ListComponentView.unorderedList(),
                buttons: CompositeComponentView.block({
                    button: new ButtonCommandView()
                }),
                input: new InputComponentView(),
                inputResult: new TextComponentView()
            })
        }),
        toolbar: CompositeComponentView.block({
            container: CompositeComponentView.block({
                text: new TextComponentView()
            })
        })
    };

    get formGroup() { return this.layout.content.container.formGroup; }

    get textList() { return this.layout.content.container.textList; }

    get compositeList() { return this.layout.content.container.compositeList; }

    get buttons() { return this.layout.content.container.buttons; }

    get input() { return this.layout.content.container.input; }

    get inputResult() { return this.layout.content.container.inputResult; }
}

class TestItem {
    constructor(readonly id: number, readonly value: string) {
    }
}

class TestItemComponentViewModel extends ComponentViewModel {
    private _sourceKey: number = 0;
    get sourceID() { return this._sourceKey; }
    set sourceID(sourceKey: number) { this._sourceKey = sourceKey; }

    readonly id = new TextComponentViewModel();
    readonly value = new TextComponentViewModel();
}

class TestItemViewModelUpdater implements IViewModelUpdater<TestItem, TestItemComponentViewModel> {
    isMatch(source: TestItem, viewModel: TestItemComponentViewModel): boolean {
        return source.id === viewModel.sourceID;
    }

    updateFrom(source: TestItem, viewModel: TestItemComponentViewModel): void {
        viewModel.sourceID = source.id;
        viewModel.id.text = source.id.toString();
        viewModel.value.text = source.value;
    }

}

class MainPageViewModel {
    readonly formGroup = new ReadonlyFormGroupViewModel();
    readonly textList = new ListComponentViewModel<TextComponentViewModel>();
    readonly compositeList = new ListComponentViewModel<TestItemComponentViewModel>();
    readonly button = new CommandViewModel();
    readonly input = new TransformedInputComponentViewModel(0);
    readonly inputResult = new TextComponentViewModel();
}

new MainPage();