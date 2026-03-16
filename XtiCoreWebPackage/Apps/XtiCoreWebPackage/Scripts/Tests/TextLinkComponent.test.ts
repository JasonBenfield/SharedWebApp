
import { afterEach, describe, expect, test } from "@jest/globals";
import { TextLinkComponent, TextLinkComponentView, TextLinkComponentViewModel } from "../Lib/MVVM/TextLinkComponent";
import { TestHost } from "./TestHost";

const linkElementID = "textLinkEl";

afterEach(() => {
    TestHost.value.reset();
});

describe("Text Link Component", () => {
    test("sets element attributes when view model changes", async () => {
        const { view, component } = createLinkComponent(
            new TextLinkComponentViewModel({
                text: "Initial Text",
                href: "https://example.com/1",
                title: "Initial Title",
                target: ""
            })
        );
        TestHost.value.show(view, component);
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
        TestHost.value.immediateHandleChanges();
        expect(element?.innerText).toBe("Updated Text");
        expect(element?.href).toBe("https://example.com/2");
        expect(element?.title).toBe("Updated Title");
        expect(element?.target).toBe("_blank");
        component.dispose();
    });
});

function createLinkComponent(linkViewModel = new TextLinkComponentViewModel()) {
    const linkView = new TextLinkComponentView();
    linkView.setID(linkElementID);
    const component = new TextLinkComponent(linkViewModel, linkView);
    return {
        viewModel: linkViewModel,
        view: linkView,
        component: component
    };
}