import { afterEach, describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ButtonCommandView, Command, CommandOptionsBuilder, CommandViewModel } from "../Lib/MVVM/Command";
import { ContainerComponentView } from "../Lib/MVVM/ContainerComponentView";
import { TestHost } from "./TestHost";

const button1ElementID = "button1El";
const button1TextElementID = "button1TextEl";
const button2ElementID = "button2El";
const button3ElementID = "button3El";

afterEach(() => {
    TestHost.value.reset();
});

describe("Command", () => {
    test("should execute action", async () => {
        const { action, view, command } = createCommand();
        TestHost.value.show(view, command);
        view.simulateClick();
        TestHost.value.immediateHandleChanges();
        await action.waitForStop();
        expect(action.hasExecuted()).toBe(true);
    });
    test("should set button text", async () => {
        const { action, view, command } = createCommand();
        command.setText("Click Me");
        TestHost.value.show(view, command);
        expect(document.getElementById(button1TextElementID)?.innerText).toBe("Click Me");
    });
    test("should disable button while in progress", async () => {
        const { action, view, command } = createCommand();
        TestHost.value.show(view, command);
        view.simulateClick();
        TestHost.value.immediateHandleChanges();
        expect(getButtonElement()?.disabled).toBe(true);
        await action.waitForStop();
        TestHost.value.immediateHandleChanges();
        expect(getButtonElement()?.disabled).toBe(false);
    });
    test("should execute action from any button", async () => {
        const action = new TestAction();
        const view1 = new ButtonCommandView();
        view1.setID(button1ElementID);
        const view2 = new ButtonCommandView();
        view2.setID(button2ElementID);
        const view3 = new ButtonCommandView();
        view2.setID(button3ElementID);
        const command = new Command(
            new CommandOptionsBuilder(new CommandViewModel())
                .addViews(view1, view2, view3)
                .setAction(action.increment.bind(action))
                .build()
        );
        const buttonContainerView = new ContainerComponentView();
        buttonContainerView.addChildView(view1);
        buttonContainerView.addChildView(view2);
        buttonContainerView.addChildView(view3);
        TestHost.value.show(buttonContainerView, command);
        view1.simulateClick();
        TestHost.value.immediateHandleChanges();
        await action.waitForStop();
        TestHost.value.immediateHandleChanges();
        expect(action.hasExecuted(1)).toBe(true);

        view2.simulateClick();
        TestHost.value.immediateHandleChanges();
        await action.waitForStop();
        TestHost.value.immediateHandleChanges();
        expect(action.hasExecuted(2)).toBe(true);

        view3.simulateClick();
        TestHost.value.immediateHandleChanges();
        await action.waitForStop();
        TestHost.value.immediateHandleChanges();
        expect(action.hasExecuted(3)).toBe(true);
    });
});

function getButtonElement() {
    return document.getElementById(button1ElementID) as HTMLButtonElement;
}

function createCommand(viewModel = new CommandViewModel()) {
    const action = new TestAction();
    const view = new ButtonCommandView();
    view.setID(button1ElementID);
    view.text.setID(button1TextElementID);
    const command = new Command(
        new CommandOptionsBuilder(viewModel)
            .addView(view)
            .setAction(action.increment.bind(action))
            .build()
    );
    return {
        viewModel: viewModel,
        view: view,
        action: action,
        command: command
    };
}

class TestAction {
    private i = 0;
    private isStopped = false;

    reset() {
        this.i = 0;
        this.isStopped = false;
    }

    hasExecuted(numberOfTimes = 1) {
        return this.i === numberOfTimes;
    }

    async increment() {
        this.i++;
        while (!this.isStopped) {
            await DelayedAction.delay(10);
        }
    }

    waitForStop() {
        this.isStopped = true;
        return DelayedAction.delay(10);
    }
}