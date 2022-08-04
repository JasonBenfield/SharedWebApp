import 'mocha';
import { expect } from 'chai';
import { DelayedAction } from '../Lib/DelayedAction';
import { DebouncedAction } from '../Lib/DebouncedAction';

describe('Debounced Action', () => {
    it('Debounced action', async () => {
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
        await DelayedAction.delay(11);
        expect(timesExecuted).to.be.at.least(2);
        expect(counter).to.equal(1);
        debouncedAction.execute();
        await DelayedAction.delay(11);
        expect(counter).to.equal(2);
    });
    it('Debounced action with promise', async () => {
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
        expect(timesExecuted).to.be.at.least(2);
        expect(counter).to.equal(1);
        debouncedAction.execute();
        await DelayedAction.delay(11);
        expect(counter).to.equal(2);
    });
    it('Debounce action with Argument', async () => {
        let counter = 0;
        let debouncedAction = new DebouncedAction(
            (x, y) => {
                console.log(`x: ${x}: ${typeof x}, y: ${y}: ${typeof y}`);
                counter += x + y;
                return counter;
            },
            10
        );
        let result = debouncedAction.execute(3, 1);
        await DelayedAction.delay(20);
        expect(counter).to.equal(4);
    });
});