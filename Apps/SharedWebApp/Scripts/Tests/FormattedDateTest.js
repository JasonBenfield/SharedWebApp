"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var FormattedDate_1 = require("../Shared/FormattedDate");
describe('Formatted Date', function () {
    it('Default formatting', function () {
        var formattedDate = new FormattedDate_1.FormattedDate(new Date(2021, 0, 17, 8, 5, 23, 0));
        (0, chai_1.expect)(formattedDate.formatDate()).to.equal('1/17/21');
        (0, chai_1.expect)(formattedDate.formatTime()).to.equal('8:05 AM');
        (0, chai_1.expect)(formattedDate.formatDateTime()).to.equal('1/17/21 8:05 AM');
    });
    it('Default formatting for Date only', function () {
        var formattedDate = new FormattedDate_1.FormattedDate(new Date(2021, 0, 17, 0, 0, 0, 0));
        (0, chai_1.expect)(formattedDate.formatDateTime()).to.equal('1/17/21');
    });
});
//# sourceMappingURL=FormattedDateTest.js.map