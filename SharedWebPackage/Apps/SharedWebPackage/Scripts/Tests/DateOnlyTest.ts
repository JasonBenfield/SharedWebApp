import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';
import { DateTimeFormatOptions } from '../Lib/DateTimeFormatOptions';
import { DateTimeOffset } from '../Lib/DateTimeOffset';
import { Month } from '../Lib/Month';
import { TimeSpan } from '../Lib/TimeSpan';
import { DayOfWeek } from '../Lib/DayOfWeek';

describe('DateOnly', () => {
    it('Parse DateOnly', function () {
        const dateOnly1 = DateOnly.parse('2023-09-01')!;
        expect(dateOnly1.year).to.equal(2023);
        expect(dateOnly1.month).to.equal(Month.September);
        expect(dateOnly1.date).to.equal(1);
        expect(dateOnly1.isMaxYear).to.be.false;
        expect(dateOnly1.dayOfWeek.equals(DayOfWeek.Friday)).to.be.true;
        expect(dateOnly1.dayOfWeek.equals(DayOfWeek.Saturday)).to.be.false;

        const maxDateOnly = DateOnly.max();
        expect(maxDateOnly.year).to.equal(9999);
        expect(maxDateOnly.month).to.equal(Month.December);
        expect(maxDateOnly.date).to.equal(31);
        expect(maxDateOnly.isMaxYear).to.be.true;
    });
    it('Add Days', function () {
        expect(new DateOnly(2023, Month.August, 20).addDays(1).toISOString()).to.equal('2023-08-21');
        expect(new DateOnly(2023, Month.August, 31).addDays(1).toISOString()).to.equal('2023-09-01');
        expect(new DateOnly(2023, Month.August, 0).addDays(1).toISOString()).to.equal('2023-08-01');
        expect(new DateOnly(2023, Month.August, 20).addDays(-1).toISOString()).to.equal('2023-08-19');
        expect(new DateOnly(2022, Month.December, 31).addDays(1).toISOString()).to.equal('2023-01-01');
    });
    it('Add Months', function () {
        expect(new DateOnly(2023, Month.August, 20).addMonths(1).toISOString()).to.equal('2023-09-20');
        expect(new DateOnly(2023, Month.July, 31).addMonths(-1).toISOString()).to.equal('2023-07-01');
        expect(new DateOnly(2023, Month.January, 1).addMonths(-1).toISOString()).to.equal('2022-12-01');
        expect(new DateOnly(2022, Month.December, 31).addMonths(1).toISOString()).to.equal('2023-01-31');
    });
    it('Add Years', function () {
        expect(new DateOnly(2023, Month.August, 20).addYears(1).toISOString()).to.equal('2024-08-20');
        expect(new DateOnly(2023, Month.July, 31).addYears(-1).toISOString()).to.equal('2022-07-31');
    });
    it('Add Time Span', function () {
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromDays(1)))!.format()).to.equal('8/21/23');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromHours(1)))!.format()).to.equal('8/20/23 1:00 AM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromMinutes(5)))!.format()).to.equal('8/20/23 12:05 AM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromSeconds(15)))!.format(new DateTimeFormatOptions().use2DigitSeconds())).to.equal('8/20/23 12:00:15 AM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromMilliseconds(234)))!.format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).to.equal('8/20/23 12:00:00.234 AM');
    });
    it('Sub Time Span', function () {
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromDays(1)))!.format()).to.equal('8/19/23');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromHours(1)))!.format()).to.equal('8/19/23 11:00 PM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromMinutes(5)))!.format()).to.equal('8/19/23 11:55 PM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromSeconds(15)))!.format(new DateTimeFormatOptions().use2DigitSeconds())).to.equal('8/19/23 11:59:45 PM');
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromMilliseconds(234)))!.format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).to.equal('8/19/23 11:59:59.766 PM');
    });
    it('DateOnly toISOString', function () {
        expect(new DateOnly(2023, Month.August, 20).toISOString()).to.equal('2023-08-20');
    });
    it('Equals', function () {
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 20))).to.be.true;
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 19))).to.be.false;
    });
    it('Compare To', function () {
        const date = DateOnly.today();
        expect(date.compareTo(date.addDays(1))).to.be.lessThan(0);
        expect(date.compareTo(date.addDays(-1))).to.be.greaterThan(0);
        expect(date.compareTo(new DateOnly(date.year, date.month, date.date))).to.equal(0);
        expect(date.compareTo(null)).to.be.lessThan(0);
    });
});