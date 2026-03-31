import { BackgroundCss } from "../../Lib/Bootstrap/BackgroundCss";
import { ContainerCss } from "../../Lib/Bootstrap/ContainerCss";
import { ContextualClass } from "../../Lib/Bootstrap/ContextualClass";
import { DisplayCss } from "../../Lib/Bootstrap/DisplayCss";
import { FlexCss } from "../../Lib/Bootstrap/FlexCss";
import { HeightCss } from "../../Lib/Bootstrap/HeightCss";
import { MarginCss } from "../../Lib/Bootstrap/MarginCss";
import { OverflowCss } from "../../Lib/Bootstrap/OverflowCss";
import { PaddingCss } from "../../Lib/Bootstrap/PaddingCss";
import { CssLengthUnit } from "../../Lib/CssLengthUnit";
import { FormattedNumber } from "../../Lib/FormattedNumber";
import { ButtonCommandView, Command, CommandOptionsBuilder, CommandViewModel } from "../../Lib/MVVM/Command";
import { ComponentViewModel } from "../../Lib/MVVM/ComponentViewModel";
import { CompositeComponentBuilder, CompositeComponentView } from "../../Lib/MVVM/CompositeComponent";
import { FormGroupText, FormGroupView, FormGroupViewModel } from "../../Lib/MVVM/FormGroup";
import { GridCellView, GridRowView, GridView } from "../../Lib/MVVM/GridView";
import { InputComponentView } from "../../Lib/MVVM/InputComponent";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";
import { TextLinkComponent, TextLinkComponentViewModel, TextLinkCompositeComponentView } from "../../Lib/MVVM/TextLinkComponent";
import { TransformedInputComponent, TransformedInputComponentViewModel, TransformedNumberInput } from "../../Lib/MVVM/TransformedInputComponent";
import { AppHost } from "../AppHost";

class MainPage {

    constructor() {
        const pageViewModel = new MainPageViewModel();
        const pageView = new MainPageView();

        const component = new CompositeComponentBuilder(pageViewModel)
            .view(pageView.view)
            .factory({
                formGroup: (vm, v) => new FormGroupText(vm, v),
                link: (vm, v) => new TextLinkComponent(vm, v),
                textList: (vm, v) => new ListComponent(
                    new ListComponentOptionsBuilder(vm, v)
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
                ),
                compositeList: (vm, v) => new ListComponent(
                    new ListComponentOptionsBuilder(vm, v)
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
                            .withView(
                                (createItemElement) => CompositeComponentView.fromElement(
                                    createItemElement,
                                    {
                                        id: new TextComponentView(),
                                        value: new TextComponentView()
                                    }
                                )
                            )
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
                ),
                button: (vm, v) => new Command(
                    new CommandOptionsBuilder(vm)
                        .addView(v)
                        .setAction(() => {
                            alert("Testing");
                        })
                        .build()
                ),
                input: (vm, v) => new TransformedInputComponent(
                    vm,
                    v,
                    new TransformedNumberInput()
                        .setNumberOfDecimals(2)
                        .setFormatString(FormattedNumber.currencyFormatString)
                ),
                inputResult: (vm, v) => new TextComponent(vm, v)
            })
            .build();
        component.formGroup.setCaption("Caption 1");
        component.formGroup.setValue("Value 1");
        component.link.href = "https://example.com";
        component.link.text = "Example";
        component.textList.header.text = "Text List Header";
        component.textList.setItems("Test 1", "Test 2", "Test 3");
        component.textList.footer.text = "Text List Footer";
        component.compositeList.header.text = "Composite List Header";
        component.compositeList.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"), new TestItem(4, "Test 4"));
        component.compositeList.footer.text = "Composite List Footer";
        component.button.setText("Test Button");
        component.input.when.valueChanged.then(evt => {
            component.inputResult.text = evt.detail.toLocaleString();
        });
        AppHost.value.show(
            pageView.view,
            component
        );
    }
}

class MainPageView {
    constructor() {
        this.view.setCss(DisplayCss.flex());
        this.view.setCss(new FlexCss().column());
        this.view.setCss(HeightCss.fill());
        const layout = this.view.asLayout();
        const grid = layout.content.container.grid;
        grid.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        )
        grid.row1.cell1.text.setText("Cell 1");
        grid.row1.cell2.text.setText("Cell 2");
        grid.row1.cell3.text.setText("Cell 3");
        layout.content.setCss(new FlexCss().grow(1));
        layout.content.setCss(OverflowCss.auto());
        layout.content.container.setCss(new ContainerCss());
        layout.content.container.link.text.setCss(MarginCss.end(1));
        layout.content.container.link.otherText.setText("Other Text");
        layout.toolbar.setCss(BackgroundCss.gradient(ContextualClass.secondary).subtle());
        layout.toolbar.container.setCss(new ContainerCss());
        layout.toolbar.container.setCss(PaddingCss.xs(3));
        layout.toolbar.container.text.setText("Toolbar");
    }

    readonly view = new CompositeComponentView("div", {
        content: CompositeComponentView.block({
            container: CompositeComponentView.block({
                grid: GridView.block({
                    row1: GridRowView.block({
                        cell1: GridCellView.block({
                            text: new TextComponentView()
                        }),
                        cell2: GridCellView.block({
                            text: new TextComponentView()
                        }),
                        cell3: GridCellView.block({
                            text: new TextComponentView()
                        })
                    })
                }),
                formGroup: new FormGroupView(new TextComponentView()),
                link: TextLinkCompositeComponentView.create({
                    text: TextComponentView.span(),
                    otherText: TextComponentView.span()
                }, l => l.text),
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
    }, l => {
        return {
            formGroup: l.content.container.formGroup,
            link: l.content.container.link,
            textList: l.content.container.textList,
            compositeList: l.content.container.compositeList,
            button: l.content.container.buttons.button,
            input: l.content.container.input,
            inputResult: l.content.container.inputResult
        };
    });
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

class MainPageViewModel extends ComponentViewModel {
    readonly formGroup = new FormGroupViewModel(new TextComponentViewModel());
    readonly link = new TextLinkComponentViewModel();
    readonly textList = new ListComponentViewModel<TextComponentViewModel>();
    readonly compositeList = new ListComponentViewModel<TestItemComponentViewModel>();
    readonly button = new CommandViewModel();
    readonly input = new TransformedInputComponentViewModel(0);
    readonly inputResult = new TextComponentViewModel();
}

new MainPage();