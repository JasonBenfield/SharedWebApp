
import { afterAll, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../Lib/MVVM/TextComponent";

const textElementID = "textEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

afterAll(() => {
    mvvmPage.view.removeAllChildViews();
});

describe("Text Component", () => {
    test("adds element to dom", async () => {
        const { textComponent } = createTextComponent();
        await mvvmPage.show();
        const element = document.getElementById(textElementID);
        expect(element).not.toBeNull();
        expect(element?.innerText).toBe("");
        textComponent.dispose();
    });
    test("sets innerText of element when view model text changes", async () => {
        const { textComponent } = createTextComponent(
            new TextComponentViewModel({
                text: "Initial Value"
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(textElementID);
        expect(element?.innerText).toBe("Initial Value");
        textComponent.text = "Changed Value";
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Changed Value");
        textComponent.dispose();
    });
    test("sets title of element when view model title changes", async () => {
        const { textComponent } = createTextComponent(
            new TextComponentViewModel({
                title: "Initial Title"
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(textElementID);
        expect(element?.title).toBe("Initial Title");
        textComponent.title = "Changed Title";
        await waitForChangeNotifications();
        expect(element?.title).toBe("Changed Title");
        textComponent.dispose();
    });
});

function createTextComponent(textViewModel = new TextComponentViewModel()) {
    const textView = mvvmPage.view.addChildView(TextComponentView.block());
    textView.setID(textElementID);
    return {
        textViewModel: textViewModel,
        textView: textView,
        textComponent: new TextComponent(textViewModel, textView)
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}