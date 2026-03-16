import { ComponentViewModel } from "../../Lib/MVVM/ComponentViewModel";
import { CompositeComponent, CompositeComponentView } from "../../Lib/MVVM/CompositeComponent";
import { ContainerComponent } from "../../Lib/MVVM/ContainerComponent";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../../Lib/MVVM/ReadonlyFormGroup";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";
import { AppHost } from "../AppHost";
import { ButtonCommandView, Command, CommandOptionsBuilder, CommandViewModel } from "../../Lib/MVVM/Command";

class MainPage {

    constructor() {
        const pageView = createPageView();
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
                    .withView((createItemElement) => new CompositeComponentView(createItemElement).compose({
                        id: TextComponentView.label(),
                        value: new TextComponentView()
                    })
                    )
                    .withComponent((itemVM, itemView) => {
                        return CompositeComponent.createComposite(itemVM, itemView);
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
                .setAction(async () => {
                    alert("Testing");
                })
                .build()
        );
        command.setText("Test Button");
        const pageComponent = new ContainerComponent(new ComponentViewModel(), pageView);
        pageComponent.addComponents(
            formGroup,
            textListComponent,
            compositeListComponent,
            command
        );
        AppHost.value.show(
            pageView,
            pageComponent
        );
    }
}

function createPageView() {
    const pageView = new CompositeComponentView().compose({
        formGroup: ReadonlyFormGroupView.create(),
        textList: ListComponentView.unorderedList(),
        compositeList: ListComponentView.unorderedList(),
        buttons: new CompositeComponentView().compose({
            button: new ButtonCommandView()
        })
    });
    return pageView;
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
}

new MainPage();