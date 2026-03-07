import { afterEach, describe, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { ButtonCommandView, Command, CommandViewModel } from "../Lib/MVVM/Command";
import { TestPage } from "./TestPage";

const button1ElementID = "button1El";
const button1TextElementID = "button1TextEl";

afterEach(() => {
    TestPage.value.reset();
});

describe("Command", () => {
    test("should execute action", async () => {
        const { action, view, command } = createCommand();
        await TestPage.value.show(view, command);
        view.simulateClick();
    });
});

function createCommand(viewModel = new CommandViewModel()) {
    const action = new TestAction();
    const view = new ButtonCommandView();
    view.setID(button1ElementID);
    view.text.setID(button1TextElementID);
    const command = new Command(
        viewModel,
        view,
        action.increment.bind(action)
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