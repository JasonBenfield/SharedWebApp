
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { CompositeComponentView, CompositeComponentViewModel } from "../Lib/MVVM/CompositeComponent";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";

const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

function createDiv(id: string) {
    const el = document.createElement("div");
    el.id = id;
    return el;
}

const containerElementID = "containerEl";
const level1_1ElementID = "level1_1El";
const level1_2ElementID = "level1_2El";
const level2_1ElementID = "level2_1El";
const level2_2ElementID = "level2_2El";

beforeAll(() => {
    mvvmPage.view.removeAllChildViews();
});

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});


describe("Container Component", () => {
    test("add to dom when visible", async () => {
        const { component } = createComponent();
        await mvvmPage.show();
        const containerEl = document.getElementById(containerElementID);
        expect(containerEl).not.toBeNull();
        const level1_1El = containerEl?.querySelectorAll(`#${level1_1ElementID}`)[0];
        expect(level1_1El).not.toBeNull();
        const level2_1El = level1_1El?.querySelectorAll(`#${level2_1ElementID}`)[0];
        expect(level2_1El).not.toBeNull();
        const level2_2El = level1_1El?.querySelectorAll(`#${level2_2ElementID}`)[0];
        expect(level2_2El).not.toBeNull();
        const level1_2El = containerEl?.querySelectorAll(`#${level1_2ElementID}`)[0];
        expect(level1_2El).not.toBeNull();
        component.dispose();
    });
    test("should not add to dom when not visible", async () => {
        const { component } = createComponent({ isVisible: false });
        await mvvmPage.show();
        const containerEl = document.getElementById(containerElementID);
        expect(containerEl).toBeNull();
        component.dispose();
    });
    test("should show/hide child views", async () => {
        const { viewModel, component } = createComponent();
        await mvvmPage.show();
        viewModel.level1_2.isVisible = false;
        await waitForChangeNotifications();

        expect(document.getElementById(level1_1ElementID)).not.toBeNull();
        expect(document.getElementById(level1_2ElementID)).toBeNull();

        viewModel.level1_1.level2_2.isVisible = false;
        viewModel.level1_2.isVisible = true;
        await waitForChangeNotifications();
        expect(document.getElementById(level1_1ElementID)).not.toBeNull();
        expect(document.getElementById(level2_1ElementID)).not.toBeNull();
        expect(document.getElementById(level2_2ElementID)).toBeNull();
        expect(document.getElementById(level1_2ElementID)).not.toBeNull();

        viewModel.level1_1.isVisible = false;
        viewModel.level1_1.level2_2.isVisible = true;
        await waitForChangeNotifications();
        expect(document.getElementById(level1_1ElementID)).toBeNull();
        expect(document.getElementById(level2_2ElementID)).toBeNull();
        expect(document.getElementById(level1_2ElementID)).not.toBeNull();

        viewModel.level1_1.isVisible = true;
        await waitForChangeNotifications();
        expect(document.getElementById(level1_1ElementID)).not.toBeNull();
        expect(document.getElementById(level2_1ElementID)).not.toBeNull();

        component.dispose();
    });
});

function createComponent(options: { isVisible: boolean } = { isVisible: true }) {
    const view = new CompositeComponentView(() => createDiv(containerElementID), {
        level1_1: new CompositeComponentView(() => createDiv(level1_1ElementID), {
            level2_1: new ComponentView(() => createDiv(level2_1ElementID)),
            level2_2: new ComponentView(() => createDiv(level2_2ElementID))
        }),
        level1_2: new ComponentView(() => createDiv(level1_2ElementID))
    });
    mvvmPage.view.addChildView(view);
    const viewModel = CompositeComponentViewModel.create({
        level1_1: CompositeComponentViewModel.create({
            level2_1: new ComponentViewModel(),
            level2_2: new ComponentViewModel()
        }),
        level1_2: new ComponentViewModel()
    });
    const component = viewModel.createComponent(view);
    if (options.isVisible) {
        component.show();
    }
    else {
        component.hide();
    }
    return {
        viewModel: viewModel,
        view: view,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}