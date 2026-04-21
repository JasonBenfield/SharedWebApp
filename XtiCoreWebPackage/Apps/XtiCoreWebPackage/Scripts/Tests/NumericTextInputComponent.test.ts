
import { afterEach, describe, expect, test } from "@jest/globals";
import { InputComponentView } from "../Lib/MVVM/InputComponent";
import { NumericTextInputComponent, NumericTextInputComponentViewModel } from "../Lib/MVVM/NumericTextInputComponent";
import { TransformedInputComponentViewModel } from "../Lib/MVVM/TransformedInputComponent";
import { TestHost } from "./TestHost";

afterEach(() => {
    TestHost.value.reset();
});

describe("Numeric Text Input Component", () => {
    test("sets text value from value", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("1,234");
    });
    test("sets value from text value", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateInputEvent("2,345");
        TestHost.value.immediateHandleChanges();
        expect(component.value).toBe(2345);
    });
    test("should not set text value when changed from UI and input has focus", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateFocusEvent();
        view.simulateInputEvent("2345");
        TestHost.value.immediateHandleChanges();
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("2345");
    });
    test("should set text value when not changed from UI and input has focus", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateFocusEvent();
        component.value = 2345;
        TestHost.value.immediateHandleChanges();
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("2,345");
    });
    test("should set text value when changed from UI and input has lost focus", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateFocusEvent();
        view.simulateInputEvent("2345");
        TestHost.value.immediateHandleChanges();
        view.simulateBlurEvent();
        TestHost.value.immediateHandleChanges();
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("2,345");
    });
    test("should set text value when changed from UI and input does not have focus", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateInputEvent("2345");
        TestHost.value.immediateHandleChanges();
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("2,345");
    });
    test("sets id and name", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        const element = getInputElement(component.id);
        expect(element?.id).not.toBe("");
        expect(element?.name).not.toBe("");
    });
    test("sets focus and blurs", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        component.setFocus();
        TestHost.value.show(view, component);
        expect(document.activeElement).toBe(getInputElement(component.id));
        component.blur();
        TestHost.value.immediateHandleChanges();
        expect(document.activeElement).not.toBe(getInputElement(component.id));
    });
});

function createInputComponent(viewModel = new NumericTextInputComponentViewModel()) {
    const view = new InputComponentView();
    const component = new NumericTextInputComponent(
        viewModel,
        view
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function getInputElement(id: string) {
    return document.getElementById(id) as HTMLInputElement;
}
