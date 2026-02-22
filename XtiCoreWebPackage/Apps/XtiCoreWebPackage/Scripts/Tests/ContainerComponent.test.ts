
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { Component } from "../Lib/MVVM/Component";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { CompositeComponent } from "../Lib/MVVM/CompositeComponent";
import { ContainerView } from "../Lib/MVVM/ContainerView";
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

export class TestContainerView extends ContainerView {
    readonly level1_1: Level1_1View;
    readonly level1_2: Level1_2View;
    constructor() {
        super(() => createDiv(containerElementID));
        this.level1_1 = this.addChildView(new Level1_1View());
        this.level1_2 = this.addChildView(new Level1_2View());
    }
}

export class Level1_1View extends ContainerView {
    readonly level2_1: Level2_1View;
    readonly level2_2: Level2_2View;

    constructor() {
        super(() => createDiv(level1_1ElementID));
        this.level2_1 = this.addChildView(new Level2_1View());
        this.level2_2 = this.addChildView(new Level2_2View());
    }
}

export class Level1_2View extends ContainerView {
    constructor() {
        super(() => createDiv(level1_2ElementID));
    }
}

export class Level2_1View extends ContainerView {
    constructor() {
        super(() => createDiv(level2_1ElementID));
    }
}

export class Level2_2View extends ContainerView {
    constructor() {
        super(() => createDiv(level2_2ElementID));
    }
}

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
});

function createComponent(options: { isVisible: boolean } = { isVisible: true }) {
    const view = new TestContainerView();
    mvvmPage.view.addChildView(view);
    const viewModel = new ComponentViewModel();
    const component = new CompositeComponent(viewModel, view, {
        level1: new CompositeComponent(new ComponentViewModel(), view.level1_1, {
            level2_1: new Component(new ComponentViewModel(), view.level1_1.level2_1),
            level2_2: new Component(new ComponentViewModel(), view.level1_1.level2_2)
        }),
        level2: new Component(new ComponentViewModel(), view.level1_2)
    });
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