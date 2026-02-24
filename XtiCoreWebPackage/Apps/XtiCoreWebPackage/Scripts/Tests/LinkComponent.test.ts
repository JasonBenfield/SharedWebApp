
import { afterAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { LinkComponentView, LinkComponentViewModel } from "../Lib/MVVM/LinkComponent";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextComponentView } from "../Lib/MVVM/TextComponent";

const linkElementID = "linkEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});

describe("Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { linkComponent } = createLinkComponent(
            new LinkComponentViewModel({
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(linkElementID) as HTMLAnchorElement;
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        linkComponent.href = "https://example.com/2";
        linkComponent.title = "Updated Title";
        linkComponent.setTargetToBlank();
        await waitForChangeNotifications();
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
        linkComponent.dispose();
    });
});

function createLinkComponent(linkViewModel = new LinkComponentViewModel()) {
    const linkView = mvvmPage.view.addChildView(LinkComponentView.create({
        text: TextComponentView.block()
    }));
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