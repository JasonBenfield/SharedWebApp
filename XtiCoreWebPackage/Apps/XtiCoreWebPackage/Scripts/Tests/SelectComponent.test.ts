
import { afterEach, describe, expect, test } from "@jest/globals";
import { ConsoleLogger } from "../Lib/ConsoleLogger";
import { SelectComponent, SelectComponentView, SelectComponentViewModel } from "../Lib/MVVM/SelectComponent";
import { TestHost } from "./TestHost";

const elementID = "selectEl";

afterEach(() => {
    TestHost.value.reset();
    ConsoleLogger.value.disable();
});

describe("Select Component", () => {
    test("adds items", async () => {
        const { view, component } = createSelectComponent();
        component.addItems(
            new TestItem(1),
            new TestItem(2)
        );
        TestHost.value.show(view, component);
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.tagName).toBe("SELECT");
        expect(element?.options.length).toBe(2);
        expect(Array.from(element?.options).map(item => item.value)).toEqual(["1", "2"]);
        expect(Array.from(element?.options).map(item => item.innerText)).toEqual(["Item 1", "Item 2"]);
    });

    test("inserts items", async () => {
        const { view, component } = createSelectComponent();
        component.addItems(
            new TestItem(1),
            new TestItem(2)
        );
        TestHost.value.show(view, component);
        component.insertItems(
            1,
            new TestItem(3)
        );
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(Array.from(element?.options).map(item => item.value)).toEqual(["1", "3", "2"]);
    });

    test("sets items", async () => {
        const { view, component } = createSelectComponent();
        component.addItems(
            new TestItem(1),
            new TestItem(2)
        );
        TestHost.value.show(view, component);
        component.setItems(
            new TestItem(3),
            new TestItem(4)
        );
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(Array.from(element?.options).map(item => item.value)).toEqual(["3", "4"]);
    });

    test("adds or updates items", async () => {
        const { view, component } = createSelectComponent();
        component.addItems(
            new TestItem(1),
            new TestItem(2)
        );
        TestHost.value.show(view, component);
        component.addOrUpdateItems(
            new TestItem(1),
            new TestItem(3)
        );
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(Array.from(element?.options).map(item => item.value)).toEqual(["1", "2", "3"]);
    });

    test("removes all items", async () => {
        const { view, component } = createSelectComponent();
        const items = [
            new TestItem(1),
            new TestItem(2)
        ];
        component.addItems(...items);
        component.setValue(items[0]);
        TestHost.value.show(view, component);
        component.removeAllItems();
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.options.length).toBe(0);
        expect(element?.selectedIndex).toBe(-1);

    });

    test("selects value", async () => {
        const { view, component } = createSelectComponent();
        const items = [new TestItem(1), new TestItem(2)];
        component.addItems(...items);
        component.setValue(items[1]);
        TestHost.value.show(view, component);
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.selectedIndex).toBe(1);
        component.setValue(items[0]);
        component.immediateHandleChanges();
        expect(element?.selectedIndex).toBe(0);
    });

    test("selects value set before items are added", async () => {
        const { view, component } = createSelectComponent();
        const items = [new TestItem(1), new TestItem(2)];
        component.setValue(items[1]);
        component.addItems(...items);
        TestHost.value.show(view, component);
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.selectedIndex).toBe(1);
    });

    test("clears selected value if value not found", async () => {
        const { view, component } = createSelectComponent();
        const items = [new TestItem(1), new TestItem(2)];
        component.addItems(...items);
        component.setValue(items[1]);
        TestHost.value.show(view, component);
        component.setItems(new TestItem(1), new TestItem(3));
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.selectedIndex).toBe(-1);
    });

    test("clears selected value", async () => {
        const { view, component } = createSelectComponent();
        const items = [new TestItem(1), new TestItem(2)];
        component.addItems(...items);
        component.setValue(items[1]);
        TestHost.value.show(view, component);
        component.setValue(null);
        component.immediateHandleChanges();
        const element = document.getElementById(elementID) as HTMLSelectElement;
        expect(element?.selectedIndex).toBe(-1);
    });

    test("selects value from UI", async () => {
        const { view, component } = createSelectComponent();
        const items = [new TestItem(1), new TestItem(2)];
        component.addItems(...items);
        component.setValue(items[1]);
        TestHost.value.show(view, component);
        view.simulateChange(0);
        component.immediateHandleChanges();
        expect(component.value).toBe(items[0]);
    });

});

function createSelectComponent() {
    const viewModel = new SelectComponentViewModel<TestItem | null>();
    const view = new SelectComponentView();
    view.setID(elementID);
    const component = new SelectComponent<TestItem | null>(
        viewModel,
        view,
        null,
        {
            isMatch: (item1, item2) => item1?.id === item2?.id,
            formatValue: (val) => val?.id.toString() || null,
            formatText: (val) => val?.toString() || ""
        }
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

class TestItem {
    constructor(readonly id: number) {
    }

    toString() { return `Item ${this.id}`; }
}