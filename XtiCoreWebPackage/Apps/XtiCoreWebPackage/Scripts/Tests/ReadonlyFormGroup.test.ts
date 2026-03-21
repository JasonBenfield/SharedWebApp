
import { afterEach, describe, expect, test } from "@jest/globals";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../Lib/MVVM/ReadonlyFormGroup";
import { TestHost } from "./TestHost";

const formGroupElementID = "formGroupEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Readonly Form Group", () => {
    test("updates caption and value", async () => {
        const { view, viewModel, component } = createReadonlyFormGroup();
        TestHost.value.show(view, component);
        component.setCaption("Caption 1");
        component.setValue("Value 1");
        expect(viewModel.caption.text).toEqual("Caption 1");
        expect(viewModel.value.text).toEqual("Value 1");
        component.dispose();
    });
});

function createReadonlyFormGroup(formGroupViewModel = new ReadonlyFormGroupViewModel()) {
    const formGroupView = new ReadonlyFormGroupView();
    formGroupView.setID(formGroupElementID);
    const component = new ReadonlyFormGroup(formGroupViewModel, formGroupView);
    return {
        viewModel: formGroupViewModel,
        view: formGroupView,
        component: component
    };
}