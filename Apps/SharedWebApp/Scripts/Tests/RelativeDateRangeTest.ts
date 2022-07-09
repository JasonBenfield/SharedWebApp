import 'mocha';
import { expect } from 'chai';
import { RelativeDateRange, RelativeDayOffset, RelativeMonthOffset, RelativeYearOffset } from '../Lib/RelativeDateRange';

describe('Relative Date Range', () => { 
    it('Previous Day', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeDayOffset(-1),
            new RelativeDayOffset(0)
        );
        const dateRange = relativeDateRange.toDateRange(new Date(2022, 5, 22));
        expect(dateRange.start.value.toLocaleDateString()).to.equal('6/21/2022');
        expect(dateRange.end.value.toLocaleDateString()).to.equal('6/21/2022');
    });
    it('Previous Month', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeMonthOffset(-1, 1),
            new RelativeMonthOffset(0, 'month-end')
        );
        const dateRange = relativeDateRange.toDateRange(new Date(2022, 5, 22));
        expect(dateRange.start.value.toLocaleDateString()).to.equal('5/1/2022');
        expect(dateRange.end.value.toLocaleDateString()).to.equal('5/31/2022');
    });
    it('Previous Year', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeYearOffset(-1, 0, 1),
            new RelativeYearOffset(0, 11, 'month-end')
        );
        const dateRange = relativeDateRange.toDateRange(new Date(2022, 5, 22));
        expect(dateRange.start.value.toLocaleDateString()).to.equal('1/1/2021');
        expect(dateRange.end.value.toLocaleDateString()).to.equal('12/31/2021');
    });
    it('Two Months Ago Until Two Days Ago', function () {
        const relativeDateRange = new RelativeDateRange(
            new RelativeMonthOffset(-2, 'reference-day'),
            new RelativeDayOffset(-2),
            false
        );
        const dateRange = relativeDateRange.toDateRange(new Date(2022, 5, 22));
        expect(dateRange.start.value.toLocaleDateString()).to.equal('4/22/2022');
        expect(dateRange.end.value.toLocaleDateString()).to.equal('6/20/2022');
    });
});