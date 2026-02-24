
import { afterAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextLinkComponent, TextLinkComponentView, TextLinkComponentViewModel } from "../Lib/MVVM/TextLinkComponent";

const linkElementID = "textLinkEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});

describe("Text Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { linkComponent } = createLinkComponent(
            new TextLinkComponentViewModel({
                text: "Initial Text",
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(linkElementID) as HTMLAnchorElement;
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        linkComponent.text = "Updated Text";
        linkComponent.href = "https://example.com/2";
        linkComponent.title = "Updated Title";
        linkComponent.setTargetToBlank();
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Updated Text");
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
        linkComponent.dispose();
    });
});

function createLinkComponent(linkViewModel = new TextLinkComponentViewModel()) {
    const linkView = mvvmPage.view.addChildView(new TextLinkComponentView());
    linkView.setID(linkElementID);
    return {
        linkViewModel: linkViewModel,
        linkView: linkView,
        linkComponent: linkViewModel.createComponent(linkView)
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}