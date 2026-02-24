
import { afterAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../Lib/MVVM/ReadonlyFormGroup";

const formGroupElementID = "formGroupEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});

describe("Readonly Form Group", () => {
    test("updates caption and value", async () => {
        const { formGroupViewModel, formGroup } = createReadonlyFormGroup();
        await mvvmPage.show();
        formGroup.setCaption("Caption 1");
        formGroup.setValue("Value 1");
        expect(formGroupViewModel.caption.text).toEqual("Caption 1");
        expect(formGroupViewModel.value.text).toEqual("Value 1");
        formGroup.dispose();
    });
});

function createReadonlyFormGroup(formGroupViewModel = new ReadonlyFormGroupViewModel()) {
    const formGroupView = mvvmPage.view.addChildView(ReadonlyFormGroupView.create());
    formGroupView.setID(formGroupElementID);
    return {
        formGroupViewModel: formGroupViewModel,
        formGroupView: formGroupView,
        formGroup: formGroupViewModel.createComponent(formGroupView)
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}