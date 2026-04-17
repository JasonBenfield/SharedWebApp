
import { afterEach, describe, expect, test } from "@jest/globals";
import { InputComponent, InputComponentView, InputComponentViewModel } from "../Lib/MVVM/InputComponent";
import { TestHost } from "./TestHost";
import { ConsoleLogger } from "../Lib/ConsoleLogger";

const inputElementID = "inputEl";

afterEach(() => {
    TestHost.value.reset();
    ConsoleLogger.value.disable();
});

describe("Input Component", () => {
    test("sets text value", async () => {
        const { view, component } = createInputComponent();
        component.textValue = "Initial Value";
        component.id = inputElementID;
        TestHost.value.show(view, component);
        const element = getInputElement(inputElementID);
        expect(element?.tagName).toBe("INPUT");
        expect(element?.value).toBe("Initial Value");
        component.textValue = "Changed Value";
        TestHost.value.immediateHandleChanges();
        expect(element?.value).toBe("Changed Value");
    });
    test("sets placeholder", async () => {
        const { view, component } = createInputComponent();
        component.placeholder = "Initial Placeholder";
        component.id = inputElementID;
        TestHost.value.show(view, component);
        const element = getInputElement(inputElementID);
        expect(element?.tagName).toBe("INPUT");
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
        const element = getInputElement(component.id);
        expect(element?.id).not.toBe("");
        expect(element?.name).not.toBe("");
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
        expect(document.activeElement).toBe(getInputElement(component.id));
        component.blur();
        TestHost.value.immediateHandleChanges();
        expect(document.activeElement).not.toBe(getInputElement(component.id));
    });
});

function createInputComponent(textViewModel = new InputComponentViewModel()) {
    const view = new InputComponentView();
    const component = new InputComponent(textViewModel, view);
    return {
        viewModel: textViewModel,
        view: view,
        component: component
    };
}

function getInputElement(id: string) {
    return document.getElementById(id) as HTMLInputElement;
}
