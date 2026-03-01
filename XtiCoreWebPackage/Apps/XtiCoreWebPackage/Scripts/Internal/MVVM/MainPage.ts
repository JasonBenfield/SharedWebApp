import { CompositeComponentView } from "../../Lib/MVVM/CompositeComponent";
import { ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../../Lib/MVVM/ListComponent";
import { MvvmPage } from "../../Lib/MVVM/MvvmPage";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../../Lib/MVVM/ReadonlyFormGroup";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../../Lib/MVVM/TextComponent";

const mvvmPage = MvvmPage.get();

class MainPage {

    constructor() {
        const pageView = mvvmPage.view.addChildView(
            new CompositeComponentView().compose({
                formGroup: ReadonlyFormGroupView.create(),
                textListHeader: TextComponentView.heading(3),
                textList: ListComponentView.unorderedList()
            })
        );
        pageView.textListHeader.setText("Text List:");
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
        textListComponent.header.text = "Header";
        textListComponent.setItems("Test 1", "Test 2", "Test 3");
        textListComponent.footer.text = "Footer";
        mvvmPage.show();
    }
}

class MainPageViewModel {
    readonly formGroup = new ReadonlyFormGroupViewModel();
    readonly textList = new ListComponentViewModel<TextComponentViewModel>();
}

new MainPage();