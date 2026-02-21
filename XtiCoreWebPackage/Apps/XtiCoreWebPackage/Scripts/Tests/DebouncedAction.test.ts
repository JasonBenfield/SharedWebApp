import { describe, expect, test } from "@jest/globals";
import { DelayedAction } from "../Lib/DelayedAction";
import { DebouncedAction } from "../Lib/DebouncedAction";

describe("Debounced Action", () => {
    test("Debounced action", async () => {
        let counter = 0;
        let debouncedAction = new DebouncedAction(
            () => {
                return counter++;
            },
            10
        );
        let timesExecuted = 0;
        let startTime = new Date();
        while (new Date().getTime() - startTime.getTime() < 10) {
            debouncedAction.execute();
            timesExecuted++;
        }
        await DelayedAction.delay(15);
        expect(timesExecuted).toBeGreaterThanOrEqual(2);
        expect(counter).toBe(1);
        debouncedAction.execute();
        await DelayedAction.delay(15);
        expect(counter).toBe(2);
    });
    test("Debounced action with promise", async () => {
        let counter = 0;
        let debouncedAction = new DebouncedAction(
            () => {
                return counter++;
            },
            10
        );
        let timesExecuted = 0;
        let startTime = new Date();
        while (new Date().getTime() - startTime.getTime() < 10) {
            debouncedAction.execute();
            timesExecuted++;
        }
        await DelayedAction.delay(20);
        expect(timesExecuted).toBeGreaterThanOrEqual(2);
        expect(counter).toBe(1);
        debouncedAction.execute();
        await DelayedAction.delay(11);
        expect(counter).toBe(2);
    });
    test("Debounce action with Argument", async () => {
        let counter = 0;
        let debouncedAction = new DebouncedAction(
            (x, y) => {
                counter += x + y;
                return counter;
            },
            10
        );
        let result = debouncedAction.execute(3, 1);
        await DelayedAction.delay(20);
        expect(counter).toBe(4);
    });
});