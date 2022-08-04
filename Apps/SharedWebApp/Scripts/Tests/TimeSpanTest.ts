import 'mocha';
import { expect } from 'chai';
import { TimeSpan } from '../Lib/TimeSpan';

describe('Time Span', () => { 
    it('Time Span from Milliseconds', function () {
        const dateStart = new Date(2022, 6, 21, 7, 0, 0, 0);
        const dateEnd = new Date(2022, 6, 21, 9, 30, 2, 0);
        const timeSpan = TimeSpan.fromMilliseconds(dateEnd.getTime() - dateStart.getTime());
        expect(timeSpan.days).to.equal(0, 'Days should be 0');
        expect(timeSpan.hours).to.equal(2, 'Hours should be 2');
        expect(timeSpan.minutes).to.equal(30, 'Minutes should be 30');
        expect(timeSpan.seconds).to.equal(2, 'Seconds should be 0');
    });
    it('Parse Time Span', function () {
        const timeSpan1 = TimeSpan.parse('10675199.02:48:05.4775807');
        expect(timeSpan1.days).to.equal(10675199);
        expect(timeSpan1.hours).to.equal(2);
        expect(timeSpan1.minutes).to.equal(48);
        expect(timeSpan1.seconds).to.equal(5);
        expect(timeSpan1.ticks).to.equal(4775807);

        const timeSpan2 = TimeSpan.parse('03:45');
        expect(timeSpan2.days).to.equal(0);
        expect(timeSpan2.hours).to.equal(3);
        expect(timeSpan2.minutes).to.equal(45);
        expect(timeSpan2.seconds).to.equal(0);
        expect(timeSpan2.ticks).to.equal(0);

        const timeSpan3 = TimeSpan.parse('03:45:23');
        expect(timeSpan3.days).to.equal(0);
        expect(timeSpan3.hours).to.equal(3);
        expect(timeSpan3.minutes).to.equal(45);
        expect(timeSpan3.seconds).to.equal(23);
        expect(timeSpan3.ticks).to.equal(0);
    });
    it('Time Span toString', function () {
        expect(new TimeSpan(1, 2, 3, 4, 5).toString()).to.equal('1.02:03:04.0000005');
        expect(new TimeSpan(1, 2, 3, 4, 0).toString()).to.equal('1.02:03:04');
        expect(new TimeSpan(0, 2, 3, 4, 0).toString()).to.equal('02:03:04');
    });
    it('Time Span Rounding', function () {
        expect(new TimeSpan(1, 2, 3, 4, 1235555).toNearestMillisecond().toString()).to.equal('1.02:03:04.124');
        expect(new TimeSpan(1, 2, 3, 4, 5235555).toNearestSecond().toString()).to.equal('1.02:03:05');
        expect(new TimeSpan(1, 2, 3, 32, 5235555).toNearestMinute().toString()).to.equal('1.02:04');
    });
});