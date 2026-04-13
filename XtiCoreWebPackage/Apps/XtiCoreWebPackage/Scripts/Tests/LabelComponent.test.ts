
import { afterEach, describe, expect, test } from "@jest/globals";
import { ConsoleLogger } from "../Lib/ConsoleLogger";
import { DelayedAction } from "../Lib/DelayedAction";
import { InputComponent, InputComponentView, InputComponentViewModel } from "../Lib/MVVM/InputComponent";
import { LabelComponent, LabelComponentViewModel } from "../Lib/MVVM/LabelComponent";
import { LabelCompositeComponentView } from "../Lib/MVVM/LabelCompositeComponent";
import { TextComponentView } from "../Lib/MVVM/TextComponent";
import { TestHost } from "./TestHost";

const elementID = "labelEl";

afterEach(() => {
    TestHost.value.reset();
    ConsoleLogger.value.disable();
});

describe("Label Component", () => {
    test("sets for", async () => {
        const { labelView, labelComponent } = createLabelComponent();
        const { inputComponent } = createInputComponent();
        TestHost.value.show(labelView, labelComponent);
        const element = document.getElementById(elementID) as HTMLLabelElement;
        expect(element?.tagName).toBe("LABEL");
        expect(element?.htmlFor).toBe("");
        labelComponent.forComponent(inputComponent);
        TestHost.value.immediateHandleChanges();
        expect(inputComponent.id).not.toBe("");
        expect(element?.htmlFor).toBe(inputComponent.id);
        inputComponent.id = "inputID"
        TestHost.value.immediateHandleChanges();
        await DelayedAction.delay(100);
        TestHost.value.immediateHandleChanges();
        expect(element?.htmlFor).toBe("inputID");
    });
});

function createLabelComponent() {
    const labelViewModel = new LabelComponentViewModel();
    const labelView = LabelCompositeComponentView.create({
        text: TextComponentView.block()
    });
    labelView.setID(elementID);
    const labelComponent = new LabelComponent(labelViewModel, labelView);
    return {
        labelViewModel: labelViewModel,
        labelView: labelView,
        labelComponent: labelComponent
    };
}

function createInputComponent() {
    const inputViewModel = new InputComponentViewModel();
    const inputView = new InputComponentView();
    const inputComponent = new InputComponent(inputViewModel, inputView);
    return {
        inputViewModel: inputViewModel,
        inputView: inputView,
        inputComponent: inputComponent
    };
}