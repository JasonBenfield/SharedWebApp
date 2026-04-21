
import { afterEach, describe, expect, test } from "@jest/globals";
import { DateOnly } from "../Lib/DateOnly";
import { Month } from "../Lib/Month";
import { DateInputComponent, DateInputComponentViewModel } from "../Lib/MVVM/DateInputComponent";
import { InputComponentView } from "../Lib/MVVM/InputComponent";
import { TestHost } from "./TestHost";

afterEach(() => {
    TestHost.value.reset();
});

describe("Date Input Component", () => {
    test("sets text value from value", async () => {
        const { view, component } = createInputComponent();
        component.value = new DateOnly(2026, Month.April, 19);
        TestHost.value.show(view, component);
        const inputEl = getInputElement(component.id);
        expect(inputEl?.value).toBe("2026-04-19");
    });
    test("sets value from text value", async () => {
        const { view, component } = createInputComponent();
        TestHost.value.show(view, component);
        view.simulateInputEvent("2026-04-21");
        TestHost.value.immediateHandleChanges();
        expect(component.value.equals(new DateOnly(2026, Month.April, 21))).toBe(true);
    });
    test("sets id and name", async () => {
        const { view, component } = createInputComponent();
        TestHost.value.show(view, component);
        const element = getInputElement(component.id);
        expect(element?.id).not.toBe("");
        expect(element?.name).not.toBe("");
    });
});

function createInputComponent(viewModel = new DateInputComponentViewModel()) {
    const view = new InputComponentView();
    const component = new DateInputComponent(
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
