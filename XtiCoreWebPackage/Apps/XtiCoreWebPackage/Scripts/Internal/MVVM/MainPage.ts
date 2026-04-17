import { BackgroundCss } from "../../Lib/Bootstrap/BackgroundCss";
import { ClickableCss } from "../../Lib/Bootstrap/ClickableCss";
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
import { IEquatable } from "../../Lib/MVVM/Equatable";
import { FormGroupContainerView, FormGroupInputView, FormGroupSelect, FormGroupSelectView, FormGroupSelectViewModel, FormGroupText, FormGroupTextView, FormGroupTextViewModel, FormGroupTransformedInput, FormGroupTransformedInputViewModel } from "../../Lib/MVVM/FormGroup";
import { GridCellTextView, GridCellView, GridRowView, GridSpan, GridView } from "../../Lib/MVVM/GridView";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { GridListGroupItemView, GridListGroupView, GridListGroupItemContainerOfTextView, ListGroupView, TextListGroupItemView } from "../../Lib/MVVM/ListGroup";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";
import { LinkContainerOfTextView, TextLinkComponent, TextLinkComponentViewModel } from "../../Lib/MVVM/TextLinkComponent";
import { TransformedNumberInput } from "../../Lib/MVVM/TransformedInputComponent";
import { AppHost } from "../AppHost";

class MainPageViewModel extends ComponentViewModel {
    readonly textFormGroup = new FormGroupTextViewModel();
    readonly inputFormGroup = new FormGroupTransformedInputViewModel(0);
    readonly inputResultFormGroup = new FormGroupTextViewModel();
    readonly selectFormGroup = new FormGroupSelectViewModel<TestItem>();
    readonly selectResultFormGroup = new FormGroupTextViewModel();
    readonly link = new TextLinkComponentViewModel();
    readonly textList = new ListComponentViewModel<TextComponentViewModel>();
    readonly compositeList = new ListComponentViewModel<TestItemComponentViewModel>();
    readonly button = new CommandViewModel();
}

class MainPageView {
    constructor() {
        this.view.setCss(DisplayCss.flex());
        this.view.setCss(new FlexCss().column());
        this.view.setCss(HeightCss.fill());
        const grid = this.view.content.container.grid;
        grid.styleAsLayout();
        grid.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        )
        grid.row1.cell1.text.setText("Cell 1");
        grid.row1.cell2.text.setText("Cell 2");
        grid.row1.cell3.text.setText("Cell 3");
        this.view.content.setCss(new FlexCss().grow(1));
        this.view.content.setCss(OverflowCss.auto());
        this.view.content.container.setCss(ContainerCss.xs());
        this.view.content.setCss(PaddingCss.bottom(3));

        this.view.publicLayout.link.text.setCss(MarginCss.end(1));
        this.view.publicLayout.link.otherText.setText("Other Text");
        this.view.publicLayout.textList.setCss(MarginCss.bottom(3));
        this.view.publicLayout.compositeList.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        this.view.publicLayout.compositeList.setCss(MarginCss.bottom(3));
        this.view.publicLayout.button.styleAsOutline(ContextualClass.primary);

        this.view.toolbar.setCss(BackgroundCss.gradient(ContextualClass.secondary).subtle());
        this.view.toolbar.container.setCss(ContainerCss.xs());
        this.view.toolbar.container.setCss(PaddingCss.xs(3));
        this.view.toolbar.container.text.setText("Toolbar");
    }

    readonly view = CompositeComponentView.blockWithPublicLayout({
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
                formGroups: FormGroupContainerView.create({
                    textFormGroup: new FormGroupTextView(),
                    inputFormGroup: new FormGroupInputView(),
                    inputResultFormGroup: new FormGroupTextView(),
                    selectFormGroup: new FormGroupSelectView(),
                    selectResultFormGroup: new FormGroupTextView()
                }),
                link: LinkContainerOfTextView.create({
                    text: TextComponentView.span(),
                    otherText: TextComponentView.span()
                }, l => l.text),
                textList: ListGroupView.unorderedList(),
                compositeList: GridListGroupView.unorderedList(),
                buttons: CompositeComponentView.block({
                    button: new ButtonCommandView()
                }),
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
            textFormGroup: l.content.container.formGroups.textFormGroup,
            inputFormGroup: l.content.container.formGroups.inputFormGroup,
            inputResultFormGroup: l.content.container.formGroups.inputResultFormGroup,
            selectFormGroup: l.content.container.formGroups.selectFormGroup,
            selectResultFormGroup: l.content.container.formGroups.selectResultFormGroup,
            link: l.content.container.link,
            textList: l.content.container.textList,
            compositeList: l.content.container.compositeList,
            button: l.content.container.buttons.button,
            inputResult: l.content.container.inputResult
        };
    });
}

class MainPage {

    constructor() {
        const pageViewModel = new MainPageViewModel();
        const pageView = new MainPageView();

        const selectItems = [
            new TestItem(0, "Select..."),
            new TestItem(1, "Option 1"),
            new TestItem(1, "Option 2"),
            new TestItem(1, "Option 3")
        ];
        const component = new CompositeComponentBuilder(pageViewModel)
            .view(pageView.view)
            .factory({
                textFormGroup: (vm, v) => new FormGroupText(vm, v),
                inputFormGroup: (vm, v) => new FormGroupTransformedInput(
                    vm,
                    v,
                    new TransformedNumberInput()
                        .setNumberOfDecimals(2)
                        .setFormatString(FormattedNumber.currencyFormatString)
                ),
                inputResultFormGroup: (vm, v) => new FormGroupText(vm, v),
                selectFormGroup: (vm, v) => new FormGroupSelect<TestItem>(
                    vm,
                    v,
                    selectItems[0],
                    {
                        formatValue: (v) => v.id.toString(),
                        formatText: (v) => v.toString()
                    }
                ),
                selectResultFormGroup: (vm, v) => new FormGroupText(vm, v),
                link: (vm, v) => new TextLinkComponent(vm, v),
                textList: (vm, v) => createTextListComponent(vm, v),
                compositeList: (vm, v) => createCompositeListComponent(vm, v),
                button: (vm, v) => new Command(
                    new CommandOptionsBuilder(vm)
                        .addView(v)
                        .setAction(() => {
                            alert("Testing");
                        })
                        .build()
                )
            })
            .build();
        component.textFormGroup.setCaption("Caption 1");
        component.textFormGroup.setValue("Value 1");
        component.inputFormGroup.setCaption("Input");
        component.inputResultFormGroup.setCaption("Input Result");
        component.inputFormGroup.when.valueChanged.then(evt => {
            component.inputResultFormGroup.setValue(evt.detail.toLocaleString());
        });
        component.selectFormGroup.setCaption("Select");
        component.selectFormGroup.addItems(...selectItems);
        component.selectResultFormGroup.setCaption("Select Result");
        component.selectFormGroup.when.valueChanged.then(evt => {
            component.selectResultFormGroup.setValue(evt.detail.toString());
        });
        component.link.href = "https://example.com";
        component.link.text = "Example";
        component.textList.header.text = "Text List Header";
        component.textList.setItems("Test 1", "Test 2", "Test 3");
        component.textList.footer.text = "Text List Footer";
        component.compositeList.header.text = "Composite List Header";
        component.compositeList.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"), new TestItem(4, "Test 4"));
        component.compositeList.footer.text = "Composite List Footer";
        component.compositeList.when.headerClicked.then(evt => {
            let text: string;
            if (evt.detail.source instanceof TextComponent) {
                text = evt.detail.source.text;
            }
            else {
                text = "Header";
            }
            alert(`${text} clicked!`);
        });
        component.compositeList.when.itemClicked.then(evt => {
            let text: string;
            if (evt.detail.source instanceof TextComponent) {
                text = evt.detail.source.text;
            }
            else {
                text = "List Item";
            }
            alert(`${text} clicked!`);
        });
        component.compositeList.when.footerClicked.then(evt => {
            let text: string;
            if (evt.detail.source instanceof TextComponent) {
                text = evt.detail.source.text;
            }
            else {
                text = "Footer";
            }
            alert(`${text} clicked!`);
        });
        component.button.setText("Test Button");
        AppHost.value.show(
            pageView.view,
            component
        );
    }
}

class TestItem implements IEquatable {
    constructor(readonly id: number, readonly value: string) {
    }

    equals(other: any) {
        let result = false;
        if (other && other instanceof TestItem) {
            result = other.id == this.id;
        }
        return result;
    }

    toString() { return this.value; }
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

function createTextListComponent(viewModel: ListComponentViewModel<TextComponentViewModel>, view: ListGroupView) {
    return new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withHeaderFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => TextListGroupItemView.listItem())
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withFooterFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => TextListGroupItemView.listItem())
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withItemFactory(() => {
                return new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => {
                        const itemView = TextListGroupItemView.listItem();
                        return itemView;
                    })
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView));
            })
            .build(new TextViewModelUpdater())
    );
}

function createCompositeListComponent(viewModel: ListComponentViewModel<TestItemComponentViewModel>, view: GridListGroupView) {
    return new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withHeaderFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => {
                        const headerView = GridListGroupItemContainerOfTextView.listItem(
                            {
                                textCell: GridCellTextView.block()
                            },
                            l => l.textCell
                        );
                        headerView.textCell.setGridColumn(new GridSpan(2));
                        return headerView;
                    })
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withFooterFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => {
                        const footerView = GridListGroupItemContainerOfTextView.listItem(
                            {
                                textCell: GridCellTextView.block()
                            },
                            l => l.textCell
                        );
                        footerView.textCell.setGridColumn(new GridSpan(2));
                        return footerView;
                    })
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                .withView(
                    () => {
                        const listItemView = GridListGroupItemView.block({
                            id: GridCellTextView.block(),
                            value: GridCellTextView.block()
                        });
                        listItemView.styleAsAction();
                        listItemView.setCss(new ClickableCss());
                        return listItemView;
                    }
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
    );
}

new MainPage();