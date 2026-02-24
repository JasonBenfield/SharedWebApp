import { afterAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { StyleableComponentViewMixin } from "../Lib/MVVM/StyleableComponentView";
import { TextComponentViewModel, TextViewMixin, TitleViewMixin } from "../Lib/MVVM/TextComponent";

const textElementID = "textEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));


const ComponentFromMixin = TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView)));

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});

describe("Text Component", () => {
    test("sets element attributes when view model text changes", async () => {
        const { textComponent } = createTextComponent(
            new TextComponentViewModel({
                text: "Initial Value",
                title: "Initial Title"
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(textElementID);
        expect(element?.innerText).toBe("Initial Value");
        expect(element?.title).toBe("Initial Title");
        textComponent.text = "Changed Value";
        textComponent.title = "Changed Title";
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Changed Value");
        expect(element?.title).toBe("Changed Title");
        textComponent.dispose();
    });
});

function createTextComponent(textViewModel = new TextComponentViewModel()) {
    const textView = mvvmPage.view.addChildView(new ComponentFromMixin("div"));
    textView.setID(textElementID);
    return {
        textViewModel: textViewModel,
        textView: textView,
        textComponent: textViewModel.createComponent(textView)
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}