import { afterEach, describe, expect, test } from "@jest/globals";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { StyleableComponentViewMixin } from "../Lib/MVVM/StyleableComponentView";
import { TextComponent, TextComponentView, TextComponentViewModel, TextViewMixin, TitleViewMixin } from "../Lib/MVVM/TextComponent";
import { TestHost } from "./TestHost";

const textElementID = "textEl";

const ComponentFromMixin = TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView)));

afterEach(() => {
    TestHost.value.reset();
});

describe("Text Component", () => {
    test("sets element attributes when view model text changes", async () => {
        const { view, component } = createTextComponent(
            new TextComponentViewModel({
                text: "Initial Value",
                title: "Initial Title"
            })
        );
        TestHost.value.show(view, component);
        const element = document.getElementById(textElementID);
        expect(element?.tagName).toBe("DIV");
        expect(element?.innerText).toBe("Initial Value");
        expect(element?.title).toBe("Initial Title");
        component.text = "Changed Value";
        component.title = "Changed Title";
        TestHost.value.immediateHandleChanges();
        expect(element?.innerText).toBe("Changed Value");
        expect(element?.title).toBe("Changed Title");
        component.dispose();
    });
});

function createTextComponent(textViewModel = new TextComponentViewModel()) {
    const textView = new TextComponentView();
    textView.setID(textElementID);
    const component = new TextComponent(textViewModel, textView);
    return {
        viewModel: textViewModel,
        view: textView,
        component: component
    };
}