import { expect } from 'chai';
import 'mocha';
import { TimeOnly } from '../Lib/TimeOnly';

describe('TimeOnly', () => {
    it('Parse TimeOnly', function () {
        const timeOnly1 = TimeOnly.parse('21:34:56.1230000')!;
        expect(timeOnly1.hours).to.equal(21);
        expect(timeOnly1.minutes).to.equal(34);
        expect(timeOnly1.seconds).to.equal(56);
        expect(timeOnly1.milliseconds).to.equal(123);
    });
    it('TimeOnly toISOString', function () {
        expect(new TimeOnly(8, 5).toISOString()).to.equal('08:05:00.0000000');
    });
    it('Equals', function () {
        expect(new TimeOnly(8, 5, 3, 132).equals(new TimeOnly(8, 5, 3, 132))).to.be.true;
        expect(new TimeOnly(8, 5, 3, 132).equals(new TimeOnly(8, 5, 3, 1))).to.be.false;
    });
    it('Compare To', function () {
        const now = TimeOnly.now();
        expect(now.compareTo(now.addHours(1))).to.be.lessThan(0);
        expect(now.compareTo(now.addHours(-1))).to.be.greaterThan(0);
        expect(now.compareTo(new TimeOnly(now.hours, now.minutes, now.seconds, now.milliseconds))).to.equal(0);
        expect(now.compareTo(null)).to.be.lessThan(0);
    });
});