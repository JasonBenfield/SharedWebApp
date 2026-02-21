
import { describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { LinkComponent, LinkComponentView, LinkComponentViewModel } from "../Lib/MVVM/LinkComponent";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";

const linkElementID = "linkEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

describe("Link Component", () => {
    //test("sets viewModel href", () => {
    //    const { linkViewModel, linkView, linkComponent } = createLinkComponent();
    //    linkComponent.href = "https://example.com";
    //    expect(linkViewModel.href).toBe("https://example.com");
    //    linkComponent.dispose();
    //});
    //test("sets viewModel target to blank", () => {
    //    const { linkViewModel, linkView, linkComponent } = createLinkComponent();
    //    linkComponent.setTargetToBlank();
    //    expect(linkViewModel.target).toBe("_blank");
    //    linkComponent.dispose();
    //});
    test("sets element attributes when view model text changes", async () => {
        const { linkViewModel, linkView, linkComponent } = createLinkComponent(
            new LinkComponentViewModel({
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        linkView.setID("test1");

        await waitForChangeNotifications();
        const element = document.getElementById("test1") as HTMLAnchorElement;
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        linkComponent.href = "https://example.com/2";
        linkComponent.title = "Updated Title";

        await waitForChangeNotifications();
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        linkComponent.dispose();
    });
});

function createLinkComponent(linkViewModel = new LinkComponentViewModel()) {
    const linkView = mvvmPage.view.addChildView(new LinkComponentView());
    linkView.setID(linkElementID);
    return {
        linkViewModel: linkViewModel,
        linkView: linkView,
        linkComponent: new LinkComponent(linkViewModel, linkView)
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}