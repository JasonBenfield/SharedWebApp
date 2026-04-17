
import { afterEach, describe, expect, test } from "@jest/globals";
import { FormGroupView, FormGroupViewModel } from "../Lib/MVVM/FormGroup";
import { FormGroupText } from "../Lib/MVVM/FormGroupText";
import { TextComponentView, TextComponentViewModel } from "../Lib/MVVM/TextComponent";
import { TestHost } from "./TestHost";

const formGroupElementID = "formGroupEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Readonly Form Group", () => {
    test("updates caption and value", async () => {
        const { view, viewModel, component } = createReadonlyFormGroup();
        TestHost.value.show(view, component);
        component.caption.text = "Caption 1";
        component.value.text = "Value 1";
        expect(viewModel.caption.text).toEqual("Caption 1");
        expect(viewModel.value.text).toEqual("Value 1");
        component.dispose();
    });
});

function createReadonlyFormGroup(formGroupViewModel = new FormGroupViewModel(new TextComponentViewModel())) {
    const formGroupView = new FormGroupView(new TextComponentView());
    formGroupView.setID(formGroupElementID);
    const component = new FormGroupText(formGroupViewModel, formGroupView);
    return {
        viewModel: formGroupViewModel,
        view: formGroupView,
        component: component
    };
}