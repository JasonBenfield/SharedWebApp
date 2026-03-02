
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { GeneratedID } from "../Lib/GeneratedID";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { CompositeComponent, CompositeComponentView } from "../Lib/MVVM/CompositeComponent";
import { ContainerComponent } from "../Lib/MVVM/ContainerComponent";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../Lib/MVVM/ListComponent";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../Lib/MVVM/TextComponent";
import { ConsoleLogger } from "../Lib/ConsoleLogger";

const elementID = "listEl";
const headerID = "headerEl";
const footerID = "footerEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));
let containerView: ContainerComponentView | null = null;
let containerComponent: ContainerComponent | null = null;

beforeEach(() => {
    containerView = mvvmPage.view.addChildView(ContainerComponentView.block());
    containerComponent = new ContainerComponent(new ComponentViewModel(), containerView);
});

afterEach(() => {
    ConsoleLogger.value.disable();
    containerComponent?.dispose();
    containerComponent = null;
    mvvmPage.view.removeAllChildViews();
});

describe("List Component", () => {
    test("should add items", async () => {
        const { component } = createListWithTextItems();
        component.addItem("Test 1");
        await mvvmPage.show();
        const listElement = document.getElementById(elementID);
        expect(listElement?.tagName).toBe("UL");
        expect(getListItems().length).toBe(1);
        expect(getListItemElement(0)?.innerText).toBe("Test 1");
        component.addItem("Test 2");
        await waitForChangeNotifications();
        expect(getListItemElement(1)?.innerText).toBe("Test 2");
        component.addItems("Test 3", "Test 4");
        await waitForChangeNotifications();
        expect(getListItemElement(2)?.innerText).toBe("Test 3");
        expect(getListItemElement(3)?.innerText).toBe("Test 4");
    });
    test("should set items", async () => {
        const { component } = createListWithTextItems();
        component.setItems("Test 1", "Test 2");
        await mvvmPage.show();
        expect(getListItemElement(0)?.innerText).toBe("Test 1");
        expect(getListItemElement(1)?.innerText).toBe("Test 2");
        component.setItems("Test 3", "Test 4");
        await waitForChangeNotifications();
        expect(getListItemElement(0)?.innerText).toBe("Test 3");
        expect(getListItemElement(1)?.innerText).toBe("Test 4");
        component.setItems();
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(0);
    });
    test("should add or update items", async () => {
        const { component } = createListWithCompositeItems();
        component.addOrUpdateItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        await mvvmPage.show();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2");
        component.addOrUpdateItems(new TestItem(3, "Test 3"), new TestItem(2, "Test 2 Changed"));
        await waitForChangeNotifications();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2 Changed");
        expect(getListItemValueElement(2)?.innerText).toBe("Test 3");
    });
    test("should set items with updater", async () => {
        const { component } = createListWithCompositeItems();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        await mvvmPage.show();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2");
        component.setItems(new TestItem(3, "Test 3"), new TestItem(1, "Test 1 Changed"), new TestItem(2, "Test 2 Changed"));
        await waitForChangeNotifications();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 3");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 1 Changed");
        expect(getListItemValueElement(2)?.innerText).toBe("Test 2 Changed");
    });
    test("should set items with header", async () => {
        const { component } = createListWithHeader();
        component.header.text = "Header";
        await mvvmPage.show();
        expect(document.getElementById(headerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Header");
        component.header.text = "Changed Header";
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Changed Header");
        component.removeAllItems();
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(3);
        expect(getListItemElement(0)?.id).toBe(headerID);
    });
    test("should set items with footer", async () => {
        const { component } = createListWithFooter();
        component.footer.text = "Footer";
        await mvvmPage.show();
        expect(document.getElementById(footerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(3)?.id).toBe(footerID);
        expect(getListItemElement(3)?.innerText).toBe("Footer");
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 3"), new TestItem(3, "Test 3"));
        component.footer.text = "Changed Footer";
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(4)?.id).toBe(footerID);
        expect(getListItemElement(4)?.innerText).toBe("Changed Footer");
        component.removeAllItems();
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(3);
        expect(getListItemElement(2)?.id).toBe(footerID);
    });
    test("should set items with header and footer", async () => {
        const { component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.footer.text = "Footer";
        await mvvmPage.show();
        expect(document.getElementById(headerID)).toBeNull();
        expect(document.getElementById(footerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Header");
        expect(getListItemElement(4)?.id).toBe(footerID);
        expect(getListItemElement(4)?.innerText).toBe("Footer");
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 3"), new TestItem(3, "Test 3"));
        component.header.text = "Changed Header";
        component.footer.text = "Changed Footer";
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(6);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Changed Header");
        expect(getListItemElement(5)?.id).toBe(footerID);
        expect(getListItemElement(5)?.innerText).toBe("Changed Footer");
        component.removeAllItems();
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        await waitForChangeNotifications();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(3)?.id).toBe(footerID);
    });
    test("should hide header and footer if all items are hidden", async () => {
        const { component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.footer.text = "Footer";
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        await mvvmPage.show();
        for (const item of component.getItems()) {
            item.hide();
        }
        await waitForChangeNotifications();
        expect(document.getElementById(headerID)).toBeNull();
        expect(document.getElementById(footerID)).toBeNull();
    });
});

function getListItemElement(index: number) {
    const listItems = getListItems();
    return listItems && listItems[index];
}

function getListItems() {
    const listElement = getListElement();
    return listElement!.getElementsByTagName("li");
}

function getListElement() {
    return document.getElementById(elementID);
}

function getListItemValueElement(index: number) {
    const listItems = getListItems();
    const listItem = listItems && listItems[index];
    return listItem ? listItem.querySelector("div") : null;
}

function createListWithTextItems() {
    const view = containerView!.addChildView(ListComponentView.unorderedList());
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TextComponentViewModel>();
    const component = containerComponent!.addComponent(
        new ListComponent(
            new ListComponentOptionsBuilder(viewModel, view)
                .withItemFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => new TextComponentView(createItemElement))
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .build(new TextViewModelUpdater())
        )
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
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

function createListWithCompositeItems() {
    const view = containerView!.addChildView(ListComponentView.unorderedList());
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = containerComponent!.addComponent(
        new ListComponent(
            new ListComponentOptionsBuilder(viewModel, view)
                .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                    .withView((createItemElement) => {
                        const view = new CompositeComponentView(createItemElement).compose({
                            id: TextComponentView.label(),
                            value: new TextComponentView()
                        });
                        view.setID(GeneratedID.next("listItem"))
                        return view;
                    })
                    .withComponent((itemVM, itemView) => {
                        return CompositeComponent.createComposite(itemVM, itemView);
                    })
                )
                .build(new TestItemViewModelUpdater())
        )
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithHeader() {
    const view = containerView!.addChildView(ListComponentView.unorderedList());
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = containerComponent!.addComponent(
        new ListComponent(
            new ListComponentOptionsBuilder(viewModel, view)
                .withHeaderFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => {
                            const itemView = new TextComponentView(createItemElement);
                            itemView.setID(headerID);
                            return itemView;
                        })
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                    .withView((createItemElement) => {
                        const view = new CompositeComponentView(createItemElement).compose({
                            id: TextComponentView.label(),
                            value: new TextComponentView()
                        });
                        view.setID(GeneratedID.next("listItem"))
                        return view;
                    })
                    .withComponent((itemVM, itemView) => {
                        return CompositeComponent.createComposite(itemVM, itemView);
                    })
                )
                .build(new TestItemViewModelUpdater())
        )
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithFooter() {
    const view = containerView!.addChildView(ListComponentView.unorderedList());
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = containerComponent!.addComponent(
        new ListComponent(
            new ListComponentOptionsBuilder(viewModel, view)
                .withFooterFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => {
                            const itemView = new TextComponentView(createItemElement);
                            itemView.setID(footerID);
                            return itemView;
                        })
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                    .withView((createItemElement) => {
                        const view = new CompositeComponentView(createItemElement).compose({
                            id: TextComponentView.label(),
                            value: new TextComponentView()
                        });
                        view.setID(GeneratedID.next("listItem"))
                        return view;
                    })
                    .withComponent((itemVM, itemView) => {
                        return CompositeComponent.createComposite(itemVM, itemView);
                    })
                )
                .build(new TestItemViewModelUpdater())
        )
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithHeaderAndFooter() {
    const view = containerView!.addChildView(ListComponentView.unorderedList());
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = containerComponent!.addComponent(
        new ListComponent(
            new ListComponentOptionsBuilder(viewModel, view)
                .withHeaderFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => {
                            const itemView = new TextComponentView(createItemElement);
                            itemView.setID(headerID);
                            return itemView;
                        })
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withFooterFactory(
                    () => new ListItemFactory(() => new TextComponentViewModel())
                        .withView((createItemElement) => {
                            const itemView = new TextComponentView(createItemElement);
                            itemView.setID(footerID);
                            return itemView;
                        })
                        .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
                )
                .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                    .withView((createItemElement) => {
                        const view = new CompositeComponentView(createItemElement).compose({
                            id: TextComponentView.label(),
                            value: new TextComponentView()
                        });
                        view.setID(GeneratedID.next("listItem"))
                        return view;
                    })
                    .withComponent((itemVM, itemView) => {
                        return CompositeComponent.createComposite(itemVM, itemView);
                    })
                )
                .build(new TestItemViewModelUpdater())
        )
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(10);
}