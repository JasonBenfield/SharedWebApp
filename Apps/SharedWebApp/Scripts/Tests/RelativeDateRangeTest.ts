import 'mocha';
import { expect } from 'chai';
import { RelativeDateRange, RelativeDayOffset, RelativeMonthOffset, RelativeYearOffset } from '../Lib/RelativeDateRange';
import { DateOnly } from '../Lib/DateOnly';
import { Month } from '../Lib/Month';

describe('Relative Date Range', () => { 
    it('Previous Day', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeDayOffset(-1),
            new RelativeDayOffset(0)
        );
        const dateRange = relativeDateRange.toDateRange(new DateOnly(2022, Month.June, 22));
        expect(dateRange.start.value.toLocaleString()).to.equal('6/21/2022');
        expect(dateRange.end.value.toLocaleString()).to.equal('6/22/2022');
        expect(dateRange.end.isIncluded).to.be.false;
    });
    it('Previous Month', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeMonthOffset(-1, 1),
            new RelativeMonthOffset(0, 'month-end')
        );
        const dateRange = relativeDateRange.toDateRange(new DateOnly(2022, Month.June, 22));
        expect(dateRange.start.value.toLocaleString()).to.equal('5/1/2022');
        expect(dateRange.end.value.toLocaleString()).to.equal('6/1/2022');
        expect(dateRange.end.isIncluded).to.be.false;
    });
    it('Previous Year', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeYearOffset(-1, Month.January, 1),
            new RelativeYearOffset(0, Month.December, 'month-end')
        );
        const dateRange = relativeDateRange.toDateRange(new DateOnly(2022, Month.June, 22));
        expect(dateRange.start.value.toLocaleString()).to.equal('1/1/2021');
        expect(dateRange.end.value.toLocaleString()).to.equal('1/1/2022');
        expect(dateRange.end.isIncluded).to.be.false;
    });
    it('Two Months Ago Until Two Days Ago', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeMonthOffset(-2, 'reference-day'),
            new RelativeDayOffset(-2),
            false
        );
        const dateRange = relativeDateRange.toDateRange(new DateOnly(2022, Month.June, 22));
        expect(dateRange.start.value.toLocaleString()).to.equal('4/22/2022');
        expect(dateRange.end.value.toLocaleString()).to.equal('6/21/2022');
        expect(dateRange.end.isIncluded).to.be.false;
    });
});