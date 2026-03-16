
import { afterEach, describe, expect, test } from "@jest/globals";
import { InputComponentView } from "../Lib/MVVM/InputComponent";
import { TransformedInputBuilder, TransformedInputComponent, TransformedInputComponentViewModel } from "../Lib/MVVM/TransformedInputComponent";
import { TestHost } from "./TestHost";

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
});

function createInputComponent(viewModel = new TransformedInputComponentViewModel(0)) {
    const view = new InputComponentView();
    view.setID(inputElementID);
    const component = new TransformedInputComponent(
        viewModel,
        view,
        TransformedInputBuilder
            .fromView((textValue) => Number.parseFloat(textValue.replace(/[,|$]+/g, "")))
            .toView((value) => value.toLocaleString())
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
