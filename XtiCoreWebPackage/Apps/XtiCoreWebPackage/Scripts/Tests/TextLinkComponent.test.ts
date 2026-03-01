
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ContainerComponent } from "../Lib/MVVM/ContainerComponent";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextLinkComponent, TextLinkComponentView, TextLinkComponentViewModel } from "../Lib/MVVM/TextLinkComponent";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";

const linkElementID = "textLinkEl";
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

describe("Text Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { component } = createLinkComponent(
            new TextLinkComponentViewModel({
                text: "Initial Text",
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(linkElementID) as HTMLAnchorElement;
        expect(element?.tagName).toBe("A");
        expect(element?.innerText).toBe("Initial Text");
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        expect(element?.target).toBe("");
        component.text = "Updated Text";
        component.href = "https://example.com/2";
        component.title = "Updated Title";
        component.setTargetToBlank();
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Updated Text");
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
        component.dispose();
    });
});

function createLinkComponent(linkViewModel = new TextLinkComponentViewModel()) {
    const linkView = containerView!.addChildView(new TextLinkComponentView());
    linkView.setID(linkElementID);
    const component = containerComponent!.addComponent(new TextLinkComponent(linkViewModel, linkView));
    return {
        viewModel: linkViewModel,
        view: linkView,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}