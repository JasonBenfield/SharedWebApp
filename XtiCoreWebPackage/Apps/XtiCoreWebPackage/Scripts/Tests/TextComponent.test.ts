import { beforeEach, afterEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmOptions, MvvmPage } from "../Lib/MVVM/MvvmPage";
import { StyleableComponentViewMixin } from "../Lib/MVVM/StyleableComponentView";
import { TextComponent, TextComponentViewModel, TextViewMixin, TitleViewMixin } from "../Lib/MVVM/TextComponent";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { ContainerComponent } from "../Lib/MVVM/ContainerComponent";
import { ComponentViewModel } from "../Lib/MVVM/ComponentViewModel";

const textElementID = "textEl";
const mvvmPage = MvvmPage.create(new MvvmOptions({
    debouncedViewModelChangedWait: 1
}));


const ComponentFromMixin = TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView)));

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

describe("Text Component", () => {
    test("sets element attributes when view model text changes", async () => {
        const { component } = createTextComponent(
            new TextComponentViewModel({
                text: "Initial Value",
                title: "Initial Title"
            })
        );
        await mvvmPage.show();
        const element = document.getElementById(textElementID);
        expect(element?.tagName).toBe("DIV");
        expect(element?.innerText).toBe("Initial Value");
        expect(element?.title).toBe("Initial Title");
        component.text = "Changed Value";
        component.title = "Changed Title";
        await waitForChangeNotifications();
        expect(element?.innerText).toBe("Changed Value");
        expect(element?.title).toBe("Changed Title");
        component.dispose();
    });
});

function createTextComponent(textViewModel = new TextComponentViewModel()) {
    const textView = containerView!.addChildView(new ComponentFromMixin("div"));
    textView.setID(textElementID);
    const component = containerComponent!.addComponent(new TextComponent(textViewModel, textView));
    return {
        viewModel: textViewModel,
        view: textView,
        component: component
    };
}

function waitForChangeNotifications() {
    return DelayedAction.delay(5);
}