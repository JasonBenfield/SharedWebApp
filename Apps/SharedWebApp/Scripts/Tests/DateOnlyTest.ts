import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';

describe('DateOnly', () => { 
    it('Parse DateOnly', function () {
        const dateOnly1 = DateOnly.parse('2023-09-01')!;
        expect(dateOnly1.year).to.equal(2023);
        expect(dateOnly1.month).to.equal(8);
        expect(dateOnly1.date).to.equal(1);

        const maxDateOnly = DateOnly.parse('2023-12-31')!;
        expect(maxDateOnly.year).to.equal(2023);
        expect(maxDateOnly.month).to.equal(11);
        expect(maxDateOnly.date).to.equal(31);
    });
    it('DateOnly toISOString', function () {
        expect(new DateOnly(2023, 7, 20).toISOString()).to.equal('2023-08-20');
    });
    it('Equals', function () {
        expect(new DateOnly(2023, 7, 20).equals(new DateOnly(2023, 7, 20))).to.be.true;
        expect(new DateOnly(2023, 7, 20).equals(new DateOnly(2023, 7, 19))).to.be.false;
    });
});