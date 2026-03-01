
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";
import { ContainerComponent } from "../Lib/MVVM/ContainerComponent";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { LinkComponent, LinkComponentView, LinkComponentViewModel } from "../Lib/MVVM/LinkComponent";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextComponentView } from "../Lib/MVVM/TextComponent";

const linkElementID = "linkEl";
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

describe("Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { component } = createLinkComponent(
            new LinkComponentViewModel({
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(linkElementID) as HTMLAnchorElement;
        expect(element?.tagName).toBe("A");
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        component.href = "https://example.com/2";
        component.title = "Updated Title";
        component.setTargetToBlank();
        await waitForChangeNotifications();
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
        component.dispose();
    });
});

function createLinkComponent(linkViewModel = new LinkComponentViewModel()) {
    const linkView = containerView!.addChildView(new LinkComponentView().compose({
        text: TextComponentView.block()
    }));
    linkView.setID(linkElementID);
    const component = new LinkComponent(linkViewModel, linkView);
    return {
        viewModel: linkViewModel,
        view: linkView,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}