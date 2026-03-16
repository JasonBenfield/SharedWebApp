
import { afterEach, describe, expect, test } from "@jest/globals";
import { InputComponent, InputComponentView, InputComponentViewModel } from "../Lib/MVVM/InputComponent";
import { TestHost } from "./TestHost";

const inputElementID = "inputEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Input Component", () => {
    test("sets text value", async () => {
        const { view, component } = createInputComponent(
            new InputComponentViewModel("Initial Value")
        );
        TestHost.value.show(view, component);
        const element = getInputElement();
        expect(element?.tagName).toBe("INPUT");
        expect(element?.value).toBe("Initial Value");
        component.textValue = "Changed Value";
        TestHost.value.immediateHandleChanges();
        expect(element?.value).toBe("Changed Value");
    });
    test("sets placeholder", async () => {
        const { view, component } = createInputComponent(
            new InputComponentViewModel(
                "Initial Value", {
                placeholder: "Initial Placeholder"
            })
        );
        TestHost.value.show(view, component);
        const element = getInputElement();
        expect(element?.tagName).toBe("INPUT");
        expect(element?.placeholder).toBe("Initial Placeholder");
        component.placeholder = "Changed Placeholder";
        TestHost.value.immediateHandleChanges();
        expect(element?.placeholder).toBe("Changed Placeholder");
    });
    test("updates view model from input", async () => {
        const { view, component } = createInputComponent(
            new InputComponentViewModel("Initial Value")
        );
        TestHost.value.show(view, component);
        view.simulateInputEvent("Changed Value");
        TestHost.value.immediateHandleChanges();
        expect(component.textValue).toBe("Changed Value");
    });
});

function createInputComponent(textViewModel = new InputComponentViewModel()) {
    const view = new InputComponentView();
    view.setID(inputElementID);
    const component = new InputComponent(textViewModel, view);
    return {
        viewModel: textViewModel,
        view: view,
        component: component
    };
}

function getInputElement() {
    return document.getElementById(inputElementID) as HTMLInputElement;
}
