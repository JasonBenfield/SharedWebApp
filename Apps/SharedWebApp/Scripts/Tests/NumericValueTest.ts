import 'mocha';
import { expect } from 'chai';
import { EmployeeType } from '../Internal/EmployeeType';

describe('Numeric Values', () => {
    it('Numeric value from numeric value', function () {
        let employeeType = EmployeeType.values.value(1);
        expect(employeeType.DisplayText).to.equal('Temp');
    });
    it('Numeric value from display text', function () {
        let employeeType = EmployeeType.values.value('Permanent');
        expect(employeeType.DisplayText).to.equal('Permanent');
    });
    it('Equal by numeric value', function () {
        expect(EmployeeType.values.permanent.equals(2)).to.be.true;
    });
    it('Not Equal by numeric value', function () {
        expect(EmployeeType.values.temp.equals(2)).to.be.false;
    });
    it('Equal by display text', function () {
        expect(EmployeeType.values.temp.equals('Temp')).to.be.true;
    });
    it('Equal by display text is case insensitive', function () {
        expect(EmployeeType.values.temp.equals('tEmP')).to.be.true;
    });
    it('Not Equal by display text', function () {
        expect(EmployeeType.values.temp.equals('Permanent')).to.be.false;
    });
});