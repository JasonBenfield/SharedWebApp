
import { describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { TextComponent, TextComponentView, TextComponentViewModel } from "../Lib/MVVM/TextComponent";

const textElementID = "textEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));

describe("Text Component", () => {
    test("adds element to dom", () => {
        const { textViewModel, textView, textComponent } = createTextComponent();
        textView.setID("test1");
        const element = document.getElementById("test1");
        expect(element).not.toBeNull();
        expect(element?.innerText).toBe("");
        textComponent.dispose();
    });
    test("sets viewModel text", () => {
        const { textViewModel, textView, textComponent } = createTextComponent();
        textComponent.text = "Changed Text";
        expect(textViewModel.text).toBe("Changed Text");
        textComponent.dispose();
    });
    test("sets viewModel title", () => {
        const { textViewModel, textView, textComponent } = createTextComponent();
        textComponent.title = "Changed Title";
        expect(textViewModel.title).toBe("Changed Title");
        textComponent.dispose();
    });
    test("sets innerText of element when view model text changes", async () => {
        const { textViewModel, textView, textComponent } = createTextComponent(
            new TextComponentViewModel({
                text: "Initial Value"
            })
        );
        textView.setID("test1");

        const element = document.getElementById("test1");
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Initial Value");
        textViewModel.text = "Changed Value";
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Changed Value");
        textComponent.dispose();
    });
    test("sets title of element when view model title changes", async () => {
        const { textViewModel, textView, textComponent } = createTextComponent(
            new TextComponentViewModel({
                title: "Initial Title"
            })
        );
        textView.setID("test1");

        const element = document.getElementById("test1");
        await waitForChangeNotifications();
        expect(element?.title).toBe("Initial Title");
        textViewModel.title = "Changed Title";
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