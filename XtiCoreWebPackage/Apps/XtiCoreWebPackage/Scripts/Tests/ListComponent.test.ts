
import { afterEach, describe, expect, test } from "@jest/globals";
import { ConsoleLogger } from "../Lib/ConsoleLogger";
import { GeneratedID } from "../Lib/GeneratedID";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { CompositeComponentBuilder, CompositeComponentView } from "../Lib/MVVM/CompositeComponent";
import { IViewModelUpdater, ListComponent, ListComponentOptionsBuilder, ListComponentView, ListComponentViewModel, ListItemFactory, TextViewModelUpdater } from "../Lib/MVVM/ListComponent";
import { TextButtonComponent, TextButtonComponentView, TextButtonComponentViewModel } from "../Lib/MVVM/TextButtonComponent";
import { TextComponent, TextComponentView, TextComponentViewModel, ContainerOfTextView } from "../Lib/MVVM/TextComponent";
import { TestHost } from "./TestHost";
import { DelayedAction } from "../Lib/DelayedAction";

const elementID = "listEl";
const headerID = "headerEl";
const footerID = "footerEl";

afterEach(() => {
    ConsoleLogger.value.disable();
    TestHost.value.reset();
});

describe("List Component", () => {
    test("should add items", async () => {
        const { view, component } = createListWithTextItems();
        component.addItem("Test 1");
        TestHost.value.show(view, component);
        const listElement = document.getElementById(elementID);
        expect(listElement?.tagName).toBe("UL");
        expect(getListItems().length).toBe(1);
        expect(getListItemElement(0)?.innerText).toBe("Test 1");
        component.addItem("Test 2");
        TestHost.value.immediateHandleChanges();
        expect(getListItemElement(1)?.innerText).toBe("Test 2");
        component.addItems("Test 3", "Test 4");
        TestHost.value.immediateHandleChanges();
        expect(getListItemElement(2)?.innerText).toBe("Test 3");
        expect(getListItemElement(3)?.innerText).toBe("Test 4");
    });
    test("should set items", async () => {
        const { view, component } = createListWithTextItems();
        component.setItems("Test 1", "Test 2");
        TestHost.value.show(view, component);
        expect(getListItemElement(0)?.innerText).toBe("Test 1");
        expect(getListItemElement(1)?.innerText).toBe("Test 2");
        component.setItems("Test 3", "Test 4");
        TestHost.value.immediateHandleChanges();
        expect(getListItemElement(0)?.innerText).toBe("Test 3");
        expect(getListItemElement(1)?.innerText).toBe("Test 4");
        component.setItems();
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(0);
    });
    test("should add or update items", async () => {
        const { view, component } = createListWithCompositeItems();
        component.addOrUpdateItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        TestHost.value.show(view, component);
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2");
        component.addOrUpdateItems(new TestItem(3, "Test 3"), new TestItem(2, "Test 2 Changed"));
        TestHost.value.immediateHandleChanges();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2 Changed");
        expect(getListItemValueElement(2)?.innerText).toBe("Test 3");
    });
    test("should set items with updater", async () => {
        const { view, component } = createListWithCompositeItems();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        TestHost.value.show(view, component);
        expect(getListItemValueElement(0)?.innerText).toBe("Test 1");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 2");
        component.setItems(new TestItem(3, "Test 3"), new TestItem(1, "Test 1 Changed"), new TestItem(2, "Test 2 Changed"));
        TestHost.value.immediateHandleChanges();
        expect(getListItemValueElement(0)?.innerText).toBe("Test 3");
        expect(getListItemValueElement(1)?.innerText).toBe("Test 1 Changed");
        expect(getListItemValueElement(2)?.innerText).toBe("Test 2 Changed");
    });
    test("should set items with header", async () => {
        const { view, component } = createListWithHeader();
        component.header.text = "Header";
        TestHost.value.show(view, component);
        expect(document.getElementById(headerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Header");
        component.header.text = "Changed Header";
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.innerText).toBe("Changed Header");
        component.removeAllItems();
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(3);
        expect(getListItemElement(0)?.id).toBe(headerID);
    });
    test("should set items with footer", async () => {
        const { view, component } = createListWithFooter();
        component.footer.text = "Footer";
        TestHost.value.show(view, component);
        expect(document.getElementById(footerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(3)?.id).toBe(footerID);
        expect(getListItemElement(3)?.innerText).toBe("Footer");
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 3"), new TestItem(3, "Test 3"));
        component.footer.text = "Changed Footer";
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(4)?.id).toBe(footerID);
        expect(getListItemElement(4)?.innerText).toBe("Changed Footer");
        component.removeAllItems();
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(3);
        expect(getListItemElement(2)?.id).toBe(footerID);
    });
    test("should set items with header and footer", async () => {
        const { view, component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.footer.text = "Footer";
        TestHost.value.show(view, component);
        expect(document.getElementById(headerID)).toBeNull();
        expect(document.getElementById(footerID)).toBeNull();
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(5);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.querySelector("div")?.innerText).toBe("Header");
        expect(getListItemElement(4)?.id).toBe(footerID);
        expect(getListItemElement(4)?.querySelector("div")?.innerText).toBe("Footer");
        component.setItems(new TestItem(4, "Test 4"), new TestItem(1, "Test 1"), new TestItem(2, "Test 3"), new TestItem(3, "Test 3"));
        component.header.text = "Changed Header";
        component.footer.text = "Changed Footer";
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(6);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(0)?.querySelector("div")?.innerText).toBe("Changed Header");
        expect(getListItemElement(5)?.id).toBe(footerID);
        expect(getListItemElement(5)?.querySelector("div")?.innerText).toBe("Changed Footer");
        component.removeAllItems();
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(0);
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"));
        TestHost.value.immediateHandleChanges();
        expect(getListItems().length).toBe(4);
        expect(getListItemElement(0)?.id).toBe(headerID);
        expect(getListItemElement(3)?.id).toBe(footerID);
    });
    test("should hide header and footer if all items are hidden", async () => {
        const { view, component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.footer.text = "Footer";
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        TestHost.value.show(view, component);
        for (const item of component.getItems()) {
            item.hide();
        }
        TestHost.value.immediateHandleChanges();
        expect(document.getElementById(headerID)).toBeNull();
        expect(document.getElementById(footerID)).toBeNull();
    });
    test("should notify when item clicked", async () => {
        const { view, component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        component.footer.text = "Footer";
        type TestListItemComponent = ReturnType<typeof createCompositeItemComponent>;
        let clickedListItem: TestListItemComponent | null = null;
        let clickedButton: TextButtonComponent | null = null;
        component.when.itemClicked.then((evt) => {
            clickedListItem = evt.detail.item;
            clickedButton = evt.detail.source as TextButtonComponent;
        });
        TestHost.value.show(view, component);
        const listItemViews = view.getItems();
        const itemView2 = listItemViews[2] as ReturnType<typeof createCompositeItemView>;
        itemView2.button.simulateClick();
        await DelayedAction.delay(10);
        const expectedListItem = component.getItems()[1];
        expect(clickedListItem).toBe(expectedListItem);
        expect(clickedButton).toBe(expectedListItem.button);
    });
    test("should notify when header clicked", async () => {
        const { view, component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        component.footer.text = "Footer";
        let clickedHeader: TextComponent | null = null;
        component.when.headerClicked.then((evt) => {
            clickedHeader = evt.detail.header;
        });
        TestHost.value.show(view, component);
        const listItemViews = view.getItems();
        const headerView = listItemViews[0] as ReturnType<typeof createCompositeHeaderView>;
        headerView.button.simulateClick();
        await DelayedAction.delay(10);
        expect(clickedHeader).toBe(component.header);
    });
    test("should notify when footer clicked", async () => {
        const { view, component } = createListWithHeaderAndFooter();
        component.header.text = "Header";
        component.setItems(new TestItem(1, "Test 1"), new TestItem(2, "Test 2"), new TestItem(3, "Test 3"));
        component.footer.text = "Footer";
        let clickedFooter: TextComponent | null = null;
        component.when.footerClicked.then((evt) => {
            clickedFooter = evt.detail.footer;
        });
        TestHost.value.show(view, component);
        const listItemViews = view.getItems();
        const footerView = listItemViews[listItemViews.length - 1] as ReturnType<typeof createCompositeFooterView>;
        footerView.button.simulateClick();
        await DelayedAction.delay(10);
        expect(clickedFooter).toBe(component.footer);
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
    return listItem ? listItem.querySelectorAll("div")[1] : null;
}

function createListWithTextItems() {
    const view = ListComponentView.unorderedList();
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TextComponentViewModel>();
    const component = new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withItemFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => TextComponentView.listItem())
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .build(new TextViewModelUpdater())
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
    readonly button = new TextButtonComponentViewModel();
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
    const view = ListComponentView.unorderedList();
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                .withView(createCompositeItemView)
                .withComponent(createCompositeItemComponent)
            )
            .build(new TestItemViewModelUpdater())
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithHeader() {
    const view = ListComponentView.unorderedList();
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withHeaderFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => {
                        const itemView = TextComponentView.listItem();
                        itemView.setID(headerID);
                        return itemView;
                    })
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                .withView(createCompositeItemView)
                .withComponent(createCompositeItemComponent)
            )
            .build(new TestItemViewModelUpdater())
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithFooter() {
    const view = ListComponentView.unorderedList();
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withFooterFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => {
                        const itemView = TextComponentView.listItem();
                        itemView.setID(footerID);
                        return itemView;
                    })
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                .withView(createCompositeItemView)
                .withComponent(createCompositeItemComponent)
            )
            .build(new TestItemViewModelUpdater())
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createListWithHeaderAndFooter() {
    const view = ListComponentView.unorderedList();
    view.setID(elementID);
    const viewModel = new ListComponentViewModel<TestItemComponentViewModel>();
    const component = new ListComponent(
        new ListComponentOptionsBuilder(viewModel, view)
            .withHeaderFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => createCompositeHeaderView())
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withFooterFactory(
                () => new ListItemFactory(() => new TextComponentViewModel())
                    .withView(() => createCompositeFooterView())
                    .withComponent((itemVM, itemView) => new TextComponent(itemVM, itemView))
            )
            .withItemFactory(() => new ListItemFactory(() => new TestItemComponentViewModel())
                .withView(createCompositeItemView)
                .withComponent(createCompositeItemComponent)
            )
            .build(new TestItemViewModelUpdater())
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function createCompositeHeaderView() {
    const itemView = ContainerOfTextView.listItem({
        text: new TextComponentView(),
        button: new TextButtonComponentView()
    }, l => l.text);
    itemView.setID(headerID);
    return itemView;
}

function createCompositeFooterView() {
    const itemView = ContainerOfTextView.listItem({
        text: new TextComponentView(),
        button: new TextButtonComponentView()
    }, l => l.text);
    itemView.setID(footerID);
    return itemView;
}

function createCompositeItemView() {
    const view = CompositeComponentView.listItem({
        id: new TextComponentView(),
        value: new TextComponentView(),
        button: new TextButtonComponentView()
    });
    const itemID = GeneratedID.next("listItem");
    view.setID(itemID);
    view.id.setID(`${itemID}_id`);
    view.value.setID(`${itemID}_value`);
    return view;
}

function createCompositeItemComponent(itemVM: TestItemComponentViewModel, itemView: ReturnType<typeof createCompositeItemView>) {
    return new CompositeComponentBuilder(itemVM)
        .view(itemView)
        .factory({
            id: (vm, v) => new TextComponent(vm, v),
            value: (vm, v) => new TextComponent(vm, v),
            button: (vm, v) => new TextButtonComponent(vm, v)
        })
        .build()
}