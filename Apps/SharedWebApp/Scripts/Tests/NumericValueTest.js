"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var EmployeeType_1 = require("../Main/EmployeeType");
describe('Numeric Values', function () {
    it('Numeric value from numeric value', function () {
        var employeeType = EmployeeType_1.EmployeeType.values.value(1);
        chai_1.expect(employeeType.DisplayText).to.equal('Temp');
    });
    it('Numeric value from display text', function () {
        var employeeType = EmployeeType_1.EmployeeType.values.value('Permanent');
        chai_1.expect(employeeType.DisplayText).to.equal('Permanent');
    });
    it('Equal by numeric value', function () {
        chai_1.expect(EmployeeType_1.EmployeeType.values.permanent.equals(2)).to.be.true;
    });
    it('Not Equal by numeric value', function () {
        chai_1.expect(EmployeeType_1.EmployeeType.values.temp.equals(2)).to.be.false;
    });
    it('Equal by display text', function () {
        chai_1.expect(EmployeeType_1.EmployeeType.values.temp.equals('Temp')).to.be.true;
    });
    it('Equal by display text is case insensitive', function () {
        chai_1.expect(EmployeeType_1.EmployeeType.values.temp.equals('tEmP')).to.be.true;
    });
    it('Not Equal by display text', function () {
        chai_1.expect(EmployeeType_1.EmployeeType.values.temp.equals('Permanent')).to.be.false;
    });
});
//# sourceMappingURL=NumericValueTest.js.map