import 'mocha';
import { expect } from 'chai';
import { DelayedAction } from '../Lib/DelayedAction';

describe('Delayed Action', () => {
    it('Delay action', async () => {
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
        expect(ts).to.be.at.least(100);
        expect(result).to.equal(2);
    });
    it('Delay action with args', async () => {
        let delayedAction = new DelayedAction(
            (x,y) => {
                return x + y;
            },
            100
        );
        let result = await delayedAction.execute(1,2);
        expect(result).to.equal(3);
    });
    it('Delay action with Argument', async () => {
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
        expect(result).to.equal(7);
    });
});