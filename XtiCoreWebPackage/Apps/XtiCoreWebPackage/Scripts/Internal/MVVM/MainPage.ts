import { BackgroundCss } from "../../Lib/Bootstrap/BackgroundCss";
import { ClickableCss } from "../../Lib/Bootstrap/ClickableCss";
import { ContainerCss } from "../../Lib/Bootstrap/ContainerCss";
import { ContextualClass } from "../../Lib/Bootstrap/ContextualClass";
import { DisplayCss } from "../../Lib/Bootstrap/DisplayCss";
import { FlexCss } from "../../Lib/Bootstrap/FlexCss";
import { FormControlCss } from "../../Lib/Bootstrap/FormGroupCss";
import { HeightCss } from "../../Lib/Bootstrap/HeightCss";
import { MarginCss } from "../../Lib/Bootstrap/MarginCss";
import { OverflowCss } from "../../Lib/Bootstrap/OverflowCss";
import { PaddingCss } from "../../Lib/Bootstrap/PaddingCss";
import { CssLengthUnit } from "../../Lib/CssLengthUnit";
import { ButtonCommandView, Command, CommandOptionsBuilder, CommandViewModel } from "../../Lib/MVVM/Command";
import { ComponentViewModel } from "../../Lib/MVVM/ComponentViewModel";
import { CompositeComponentBuilder, CompositeComponentView } from "../../Lib/MVVM/CompositeComponent";
import { IEquatable } from "../../Lib/MVVM/Equatable";
import { FormGroupContainerView } from "../../Lib/MVVM/FormGroup";
import { FormGroupDateInput, FormGroupDateInputViewModel, FormGroupInputView, FormGroupNumericTextInput, FormGroupNumericTextInputViewModel } from "../../Lib/MVVM/FormGroupInput";
import { FormGroupSelect, FormGroupSelectView, FormGroupSelectViewModel } from "../../Lib/MVVM/FormGroupSelect";
import { FormGroupText, FormGroupTextView, FormGroupTextViewModel } from "../../Lib/MVVM/FormGroupText";
import { FormGroupTextArea, FormGroupTextAreaView, FormGroupTextAreaViewModel } from "../../Lib/MVVM/FormGroupTextArea";
import { GridCellContainerView, GridCellTextView, GridSpan } from "../../Lib/MVVM/GridView";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { GridListGroupItemContainerOfTextView, GridListGroupItemView, GridListGroupView, ListGroupView, TextListGroupItemView } from "../../Lib/MVVM/ListGroup";
import { StyleableComponentView } from "../../Lib/MVVM/StyleableComponentView";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";
import { LinkContainerOfTextView, TextLinkComponent, TextLinkComponentViewModel } from "../../Lib/MVVM/TextLinkComponent";
import { AppHost } from "../AppHost";

class MainPageViewModel extends ComponentViewModel {
    readonly textFormGroup = new FormGroupTextViewModel();
    readonly inputFormGroup = new FormGroupNumericTextInputViewModel();
    readonly inputResult = new TextComponentViewModel();
    readonly selectFormGroup = new FormGroupSelectViewModel<TestItem>();
    readonly selectResult = new TextComponentViewModel();
    readonly dateInputFormGroup = new FormGroupDateInputViewModel();
    readonly dateResult = new TextComponentViewModel();
    readonly textAreaFormGroup = new FormGroupTextAreaViewModel();
    readonly textAreaResult = new TextComponentViewModel();
    readonly link = new TextLinkComponentViewModel();
    readonly textList = new ListComponentViewModel<TextComponentViewModel>();
    readonly compositeList = new ListComponentViewModel<TestItemComponentViewModel>();
    readonly button = new CommandViewModel();
}

class MainPageView extends StyleableComponentView {
    constructor() {
        super();
        this.setCss(DisplayCss.flex());
        this.setCss(new FlexCss().column());
        this.setCss(HeightCss.fill());
        this.addLayout(this.layout);
        this.layout.content.setCss(new FlexCss().grow(1));
        this.layout.content.setCss(OverflowCss.auto());
        this.layout.content.container.setCss(ContainerCss.xs());
        this.layout.content.setCss(PaddingCss.bottom(3));

        this.formGroups.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        this.formGroups.text.valueCell.setGridColumn(new GridSpan(2));
        for (const key in this.formGroupResults) {
            const textView: TextComponentView = Reflect.get(this.formGroupResults, key);
            textView.setCss(FormControlCss.text());
        }

        this.publicLayout.link.text.setCss(MarginCss.end(1));
        this.publicLayout.link.otherText.setText("Other Text");
        this.publicLayout.textList.setCss(MarginCss.bottom(3));
        this.publicLayout.compositeList.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        this.publicLayout.compositeList.setCss(MarginCss.bottom(3));
        this.publicLayout.button.styleAsOutline(ContextualClass.primary);

        this.layout.toolbar.setCss(BackgroundCss.gradient(ContextualClass.secondary).subtle());
        this.layout.toolbar.container.setCss(ContainerCss.xs());
        this.layout.toolbar.container.setCss(PaddingCss.xs(3));
        this.layout.toolbar.container.text.setText("Toolbar");
    }

    private readonly formGroups = FormGroupContainerView.create({
        text: new FormGroupTextView(),
        input: new FormGroupInputView(),
        select: new FormGroupSelectView(),
        date: new FormGroupInputView(),
        textArea: new FormGroupTextAreaView()
    });

    private readonly formGroupResults = {
        input: this.formGroups.input
            .addCell(GridCellContainerView.block())
            .addChildView(TextComponentView.block()),
        select: this.formGroups.select
            .addCell(GridCellContainerView.block())
            .addChildView(TextComponentView.block()),
        date: this.formGroups.date
            .addCell(GridCellContainerView.block())
            .addChildView(TextComponentView.block()),
        textArea: this.formGroups.textArea
            .addCell(GridCellContainerView.block())
            .addChildView(TextComponentView.block())
    };

    private readonly layout = {
        content: CompositeComponentView.block({
            container: CompositeComponentView.block({
                formGroups: this.formGroups,
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
    };

    readonly publicLayout = {
        textFormGroup: this.formGroups.text,
        inputFormGroup: this.formGroups.input,
        inputResult: this.formGroupResults.input,
        selectFormGroup: this.formGroups.select,
        selectResult: this.formGroupResults.select,
        dateInputFormGroup: this.formGroups.date,
        dateResult: this.formGroupResults.date,
        textAreaFormGroup: this.formGroups.textArea,
        textAreaResult: this.formGroupResults.textArea,
        link: this.layout.content.container.link,
        textList: this.layout.content.container.textList,
        compositeList: this.layout.content.container.compositeList,
        button: this.layout.content.container.buttons.button
    };
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
            .view(pageView)
            .factory({
                textFormGroup: (vm, v) => new FormGroupText(vm, v),
                inputFormGroup: (vm, v) => new FormGroupNumericTextInput(vm, v),
                inputResult: (vm, v) => new TextComponent(vm, v),
                selectFormGroup: (vm, v) => new FormGroupSelect<TestItem>(
                    vm,
                    v,
                    selectItems[0],
                    {
                        formatValue: (v) => v.id.toString(),
                        formatText: (v) => v.toString()
                    }
                ),
                selectResult: (vm, v) => new TextComponent(vm, v),
                dateInputFormGroup: (vm, v) => new FormGroupDateInput(vm, v,),
                dateResult: (vm, v) => new TextComponent(vm, v),
                textAreaFormGroup: (vm, v) => new FormGroupTextArea(vm, v),
                textAreaResult: (vm, v) => new TextComponent(vm, v),
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
        component.inputFormGroup.when.valueChanged.then(evt => {
            component.inputResult.text = evt.detail.toLocaleString();
        });
        component.selectFormGroup.setCaption("Select");
        component.selectFormGroup.addItems(...selectItems);
        component.selectFormGroup.when.valueChanged.then(evt => {
            component.selectResult.text = evt.detail.toString();
        });
        component.dateInputFormGroup.setCaption("Date");
        component.dateInputFormGroup.when.valueChanged.then(evt => {
            component.dateResult.text = evt.detail.format();
        });
        component.textAreaFormGroup.setNumberOfRows(3);
        component.textAreaFormGroup.setCaption("Text Area");
        component.textAreaFormGroup.when.textValueChanged.then(evt => {
            component.textAreaResult.text = evt.detail;
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
            pageView,
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