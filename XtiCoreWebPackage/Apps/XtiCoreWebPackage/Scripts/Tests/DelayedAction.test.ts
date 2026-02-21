import { describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";

describe("Delayed Action", () => {
    test("Delay action", async () => {
        let delayedAction = new DelayedAction(
            () => {
                return 1 + 1;
            },
            100
        );
        let startTime = new Date();
        let result = await delayedAction.execute();
        let endTime = new Date();
        let ts = endTime.getTime() - startTime.getTime();
        expect(ts).toBeGreaterThanOrEqual(100);
        expect(result).toBe(2);
    });
    test("Delay action with args", async () => {
        let delayedAction = new DelayedAction(
            (x,y) => {
                return x + y;
            },
            100
        );
        let result = await delayedAction.execute(1,2);
        expect(result).toBe(3);
    });
    test("Delay action with Argument", async () => {
        let delayedAction = new DelayedAction(
            (x, y) => {
                return new Promise(
                    (resolve) => {
                        setTimeout(() => {
                            resolve(x + y);
                        }, 100);
                    }
                );
            },
            100
        );
        let result = await delayedAction.execute(3, 4);
        expect(result).toBe(7);
    });
});