import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';
import { TimeOnly } from '../Lib/TimeOnly';

describe('DateExtensions', () => {
    it('Is Max Year', function () {
        expect(new Date(9999, 11, 31).isMaxYear()).to.be.true;
        expect(new Date().isMaxYear()).to.be.false;
    });
    it('Equals', function () {
        expect(new Date(2023, 10, 23).equals(new Date(2023, 10, 23))).to.be.true;
        expect(new Date(2023, 10, 23).equals(new Date(2023, 9, 23))).to.be.false;
        expect(new Date(2023, 1, 5, 13, 35, 42, 156).equals(new Date(2023, 1, 5, 13, 35, 42, 156))).to.be.true;
    });
    it('ToDateOnly', function () {
        const dateOnly = new Date(2023, 1, 5, 13, 35, 42, 156).toDateOnly();
        expect(dateOnly.equals(new DateOnly(2023, 1, 5))).to.be.true;
    });
    it('ToTimeOnly', function () {
        const timeOnly = new Date(2023, 1, 5, 13, 35, 42, 156).toTimeOnly();
        expect(timeOnly.equals(new TimeOnly(13, 35, 42, 156))).to.be.true;
    });
});