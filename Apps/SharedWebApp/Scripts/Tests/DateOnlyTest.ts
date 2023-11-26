import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';
import { Month } from '../Lib/Month';

describe('DateOnly', () => { 
    it('Parse DateOnly', function () {
        const dateOnly1 = DateOnly.parse('2023-09-01')!;
        expect(dateOnly1.year).to.equal(2023);
        expect(dateOnly1.month).to.equal(Month.September);
        expect(dateOnly1.date).to.equal(1);
        expect(dateOnly1.isMaxYear).to.be.false;

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
    it('DateOnly toISOString', function () {
        expect(new DateOnly(2023, Month.August, 20).toISOString()).to.equal('2023-08-20');
    });
    it('Equals', function () {
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 20))).to.be.true;
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 19))).to.be.false;
    });
});