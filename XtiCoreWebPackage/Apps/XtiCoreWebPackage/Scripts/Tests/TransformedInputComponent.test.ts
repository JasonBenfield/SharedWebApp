
import { afterEach, describe, expect, test } from "@jest/globals";
import { InputComponentView } from "../Lib/MVVM/InputComponent";
import { TransformedInputBuilder, TransformedInputComponent, TransformedInputComponentViewModel, TransformedNumberInput } from "../Lib/MVVM/TransformedInputComponent";
import { TestHost } from "./TestHost";
import { ConsoleLogger } from "../Lib/ConsoleLogger";

const inputElementID = "inputEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Transformed Input Component", () => {
    test("sets text value from value", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        const inputEl = getInputElement();
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
        const inputEl = getInputElement();
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
        const inputEl = getInputElement();
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
        const inputEl = getInputElement();
        expect(inputEl?.value).toBe("2,345");
    });
    test("should set text value when changed from UI and input does not have focus", async () => {
        const { view, component } = createInputComponent(
            new TransformedInputComponentViewModel(1234)
        );
        TestHost.value.show(view, component);
        view.simulateInputEvent("2345");
        TestHost.value.immediateHandleChanges();
        const inputEl = getInputElement();
        expect(inputEl?.value).toBe("2,345");
    });
});

function createInputComponent(viewModel = new TransformedInputComponentViewModel(0)) {
    const view = new InputComponentView();
    view.setID(inputElementID);
    const component = new TransformedInputComponent(
        viewModel,
        view,
        new TransformedNumberInput()
    );
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function getInputElement() {
    return document.getElementById(inputElementID) as HTMLInputElement;
}
