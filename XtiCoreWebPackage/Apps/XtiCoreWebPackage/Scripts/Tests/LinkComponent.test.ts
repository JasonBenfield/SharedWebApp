
import { afterEach, describe, expect, test } from "@jest/globals";
import { LinkComponent, LinkComponentView, LinkComponentViewModel } from "../Lib/MVVM/LinkComponent";
import { TextComponentView } from "../Lib/MVVM/TextComponent";
import { TestHost } from "./TestHost";

const linkElementID = "linkEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { view, component } = createLinkComponent(
            new LinkComponentViewModel({
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        TestHost.value.show(view, component);
        const element = document.getElementById(linkElementID) as HTMLAnchorElement;
        expect(element?.tagName).toBe("A");
        expect(element?.href).toBe("https://example.com/1");
        expect(element?.title).toBe("Initial Title");
        component.href = "https://example.com/2";
        component.title = "Updated Title";
        component.setTargetToBlank();
        TestHost.value.immediateHandleChanges();
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
    });
});

function createLinkComponent(linkViewModel = new LinkComponentViewModel()) {
    const linkView = LinkComponentView.create({
        text: TextComponentView.block()
    });
    linkView.setID(linkElementID);
    const component = new LinkComponent(linkViewModel, linkView);
    return {
        viewModel: linkViewModel,
        view: linkView,
        component: component
    };
}