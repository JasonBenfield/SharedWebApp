
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../Lib/MVVM/ReadonlyFormGroup";
import { ContainerComponent } from "../Lib/MVVM/ContainerComponent";

const formGroupElementID = "formGroupEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

let containerView: ContainerComponentView | null = null;
let containerComponent: ContainerComponent | null = null;

beforeEach(() => {
    containerView = mvvmPage.view.addChildView(ContainerComponentView.block());
    containerComponent = new ContainerComponent(new ComponentViewModel(), containerView);
});

afterEach(() => {
    containerComponent?.dispose();
    mvvmPage.view.removeAllChildViews();
});

describe("Readonly Form Group", () => {
    test("updates caption and value", async () => {
        const { viewModel, component } = createReadonlyFormGroup();
        await mvvmPage.show();
        component.setCaption("Caption 1");
        component.setValue("Value 1");
        expect(viewModel.caption.text).toEqual("Caption 1");
        expect(viewModel.value.text).toEqual("Value 1");
        component.dispose();
    });
});

function createReadonlyFormGroup(formGroupViewModel = new ReadonlyFormGroupViewModel()) {
    const formGroupView = containerView!.addChildView(ReadonlyFormGroupView.create());
    formGroupView.setID(formGroupElementID);
    const component = containerComponent!.addComponent(new ReadonlyFormGroup(formGroupViewModel, formGroupView));
    return {
        viewModel: formGroupViewModel,
        view: formGroupView,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}