import { expect } from 'chai';
import 'mocha';
import { DateTimeOffset } from '../Lib/DateTimeOffset';
import { Month } from '../Lib/Month';
import { TimeSpan } from '../Lib/TimeSpan';
import { DateTimeFormatOptions } from '../Lib/DateTimeFormatOptions';
import { DayOfWeek } from '../Lib/DayOfWeek';

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
        expect(dateTime1.dayOfWeek.equals(DayOfWeek.Friday)).to.be.true;
        expect(dateTime1.dayOfWeek.equals(DayOfWeek.Saturday)).to.be.false;

        const maxDateTime = DateTimeOffset.parse('9999-12-31 23:59:59.9999999 +00:00')!;
        expect(maxDateTime.year).to.equal(9999);
        expect(maxDateTime.month).to.equal(Month.December);
        expect(maxDateTime.date).to.equal(31);
        expect(maxDateTime.isMaxYear).to.be.true;
    });
    it('Add days', function () {
        const dateTime1 = DateTimeOffset.parse('2023-09-01T10:48:01.345')!;
        const nextDay = dateTime1.addDays(1);
        expect(nextDay.equals(new DateTimeOffset(2023, Month.September, 2, 10, 48, 1, 345))).to.be.true;
    });
    it('Add Months', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 21, 31).addMonths(1).format()).to.equal('9/20/23 9:31 PM');
        expect(new DateTimeOffset(2023, Month.July, 31, 21, 31).addMonths(-1).format()).to.equal('7/1/23 9:31 PM');
        expect(new DateTimeOffset(2023, Month.January, 1, 21, 31).addMonths(-1).format()).to.equal('12/1/22 9:31 PM');
        expect(new DateTimeOffset(2022, Month.December, 31, 21, 31).addMonths(1).format()).to.equal('1/31/23 9:31 PM');
    });
    it('Add Years', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 21, 31).addYears(1).format()).to.equal('8/20/24 9:31 PM');
        expect(new DateTimeOffset(2023, Month.July, 31, 21, 31).addYears(-1).format()).to.equal('7/31/22 9:31 PM');
    });
    it('Add Time Span', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).addTimeSpan(TimeSpan.fromDays(1)).format()).to.equal('8/21/23 11:15 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).addTimeSpan(TimeSpan.fromHours(1)).format()).to.equal('8/20/23 12:15 PM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).addTimeSpan(TimeSpan.fromMinutes(5)).format()).to.equal('8/20/23 11:20 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).addTimeSpan(TimeSpan.fromSeconds(15)).format(new DateTimeFormatOptions().use2DigitSeconds())).to.equal('8/20/23 11:15:15 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).addTimeSpan(TimeSpan.fromMilliseconds(234)).format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).to.equal('8/20/23 11:15:00.234 AM');
    });
    it('Sub Time Span', function () {
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).subTimeSpan(TimeSpan.fromDays(1)).format()).to.equal('8/19/23 11:15 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).subTimeSpan(TimeSpan.fromHours(1)).format()).to.equal('8/20/23 10:15 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).subTimeSpan(TimeSpan.fromMinutes(5)).format()).to.equal('8/20/23 11:10 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).subTimeSpan(TimeSpan.fromSeconds(15)).format(new DateTimeFormatOptions().use2DigitSeconds())).to.equal('8/20/23 11:14:45 AM');
        expect(new DateTimeOffset(2023, Month.August, 20, 11, 15).subTimeSpan(TimeSpan.fromMilliseconds(234)).format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).to.equal('8/20/23 11:14:59.766 AM');
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
    it('Compare To', function () {
        const now = DateTimeOffset.now();
        expect(now.compareTo(now.addDays(1))).to.be.lessThan(0);
        expect(now.compareTo(now.addDays(-1))).to.be.greaterThan(0);
        expect(now.compareTo(new DateTimeOffset(now.year, now.month, now.date, now.hours, now.minutes, now.seconds, now.milliseconds))).to.equal(0);
        expect(now.compareTo(null)).to.be.lessThan(0);
    });
});