import { expect } from 'chai';
import 'mocha';
import { DateTimeOffset } from '../Lib/DateTimeOffset';
import { Month } from '../Lib/Month';
import { TimeSpan } from '../Lib/TimeSpan';

describe('DateTimeOffset', () => {
    it('Parse DateTimeOffset', function () {
        const dateTime1 = DateTimeOffset.parse('2023-09-01T10:48:01.3451234')!;
        expect(dateTime1.year).to.equal(2023);
        expect(dateTime1.month).to.equal(Month.September);
        expect(dateTime1.date).to.equal(1);
        expect(dateTime1.hours).to.equal(10);
        expect(dateTime1.minutes).to.equal(48);
        expect(dateTime1.seconds).to.equal(1);
        expect(dateTime1.milliseconds).to.equal(345);
        expect(dateTime1.isMaxYear).to.be.false;

        const maxDateTime = DateTimeOffset.parse('9999-12-31 23:59:59.9999999 +00:00')!;
        expect(maxDateTime.year).to.equal(9999);
        expect(maxDateTime.month).to.equal(Month.December);
        expect(maxDateTime.date).to.equal(31);
        expect(maxDateTime.isMaxYear).to.be.true;
    });
    it('Add days', function () {
        const dateTime1 = DateTimeOffset.parse('2023-09-01T10:48:01.345')!;
        console.log(`dateTime1: ${dateTime1}`);
        const nextDay = dateTime1.addDays(1);
        console.log(`nextDay: ${nextDay}`);
        expect(nextDay.equals(new DateTimeOffset(2023, Month.September, 2, 10, 48, 1, 345))).to.be.true;
    });
    it('Minus', function () {
        const dateTime1 = DateTimeOffset.parse('2023-09-01T10:48:01.3451234')!;
        const dateTime2 = DateTimeOffset.parse('2023-09-01T09:48:01.3451234')!;
        expect(dateTime1.minus(dateTime2).equals(TimeSpan.fromHours(1))).to.be.true;
    });
    it('DateTimeOffset toISOString', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 10, 54, 23, 123).toISOString()).to.equal('2023-08-20T14:54:23.123Z');
    });
    it('Equals', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 22, 57, 33, 123).equals(new DateTimeOffset(2023, Month.August, 20, 22, 57, 33, 123))).to.be.true;
        expect(new DateTimeOffset(2023, Month.August, 20, 22, 57, 33, 123).equals(new DateTimeOffset(2023, Month.August, 20, 22, 57, 33, 124))).to.be.false;
        expect(new DateTimeOffset(2023, Month.August, 20, 22, 57, 33, 123).equals(new DateTimeOffset(2023, Month.August, 19, 22, 57, 33, 123))).to.be.false;
    });
    it('Default formatting', function () {
        const date = new DateTimeOffset(2021, Month.January, 17, 8, 5, 23, 0);
        expect(date.formatDate()).to.equal('1/17/21');
        expect(date.formatTime()).to.equal('8:05 AM');
        expect(date.format()).to.equal('1/17/21 8:05 AM');
    });
    it('Default formatting for Date only', function () {
        const date = new DateTimeOffset(2021, Month.January, 17, 0, 0, 0, 0);
        expect(date.format()).to.equal('1/17/21');
    });
});