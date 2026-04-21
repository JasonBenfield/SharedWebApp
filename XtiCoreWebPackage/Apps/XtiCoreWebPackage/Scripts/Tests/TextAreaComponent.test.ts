
import { afterEach, describe, expect, test } from "@jest/globals";
import { ConsoleLogger } from "../Lib/ConsoleLogger";
import { TextAreaComponent, TextAreaComponentView, TextAreaComponentViewModel } from "../Lib/MVVM/TextAreaComponent";
import { TestHost } from "./TestHost";

const elementID = "textAreaEl";

afterEach(() => {
    TestHost.value.reset();
    ConsoleLogger.value.disable();
});

describe("Text Area Component", () => {
    test("sets text value", async () => {
        const { view, component } = createInputComponent();
        component.textValue = "Initial Value";
        component.id = elementID;
        TestHost.value.show(view, component);
        const element = getTextAreaElement(elementID);
        expect(element?.tagName).toBe("TEXTAREA");
        expect(element?.value).toBe("Initial Value");
        component.textValue = "Changed Value";
        TestHost.value.immediateHandleChanges();
        expect(element?.value).toBe("Changed Value");
    });
    test("sets placeholder", async () => {
        const { view, component } = createInputComponent();
        component.placeholder = "Initial Placeholder";
        component.id = elementID;
        TestHost.value.show(view, component);
        const element = getTextAreaElement(elementID);
        expect(element?.placeholder).toBe("Initial Placeholder");
        component.placeholder = "Changed Placeholder";
        TestHost.value.immediateHandleChanges();
        expect(element?.placeholder).toBe("Changed Placeholder");
    });
    test("updates view model from input", async () => {
        const { view, component } = createInputComponent();
        component.textValue = "Initial Value";
        TestHost.value.show(view, component);
        view.simulateInputEvent("Changed Value");
        TestHost.value.immediateHandleChanges();
        expect(component.textValue).toBe("Changed Value");
    });
    test("sets id and name", async () => {
        const { view, component } = createInputComponent();
        TestHost.value.show(view, component);
        const element = getTextAreaElement(component.id);
        expect(element?.id || "").not.toBe("");
        expect(element?.name || "").not.toBe("");
        component.id = "changedID";
        component.name = "changedName";
        TestHost.value.immediateHandleChanges();
        expect(element.id).toBe("changedID");
        expect(element.name).toBe("changedName");
    });
    test("sets focus and blurs", async () => {
        const { view, component } = createInputComponent();
        component.setFocus();
        TestHost.value.show(view, component);
        expect(document.activeElement).toBe(getTextAreaElement(component.id));
        component.blur();
        TestHost.value.immediateHandleChanges();
        expect(document.activeElement).not.toBe(getTextAreaElement(component.id));
    });
    test("sets number of columns", async () => {
        const { view, component } = createInputComponent();
        component.numberOfColumns = 80;
        TestHost.value.show(view, component);
        const element = getTextAreaElement(component.id);
        expect(element?.cols).toBe(80);
    });
    test("sets number of rows", async () => {
        const { view, component } = createInputComponent();
        component.numberOfRows = 3;
        TestHost.value.show(view, component);
        const element = getTextAreaElement(component.id);
        expect(element?.rows).toBe(3);
    });
});

function createInputComponent(viewModel = new TextAreaComponentViewModel()) {
    const view = new TextAreaComponentView();
    const component = new TextAreaComponent(viewModel, view);
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function getTextAreaElement(id: string) {
    return document.getElementById(id) as HTMLTextAreaElement;
}
