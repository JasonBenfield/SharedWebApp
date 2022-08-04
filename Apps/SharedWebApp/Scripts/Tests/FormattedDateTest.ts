import 'mocha';
import { expect } from 'chai';
import { FormattedDate } from '../Lib/FormattedDate';

describe('Formatted Date', () => {
    it('Default formatting', function () {
        let formattedDate = new FormattedDate(new Date(2021, 0, 17, 8, 5, 23, 0));
        expect(formattedDate.formatDate()).to.equal('1/17/21');
        expect(formattedDate.formatTime()).to.equal('8:05 AM');
        expect(formattedDate.formatDateTime()).to.equal('1/17/21 8:05 AM');
    });
    it('Default formatting for Date only', function () {
        let formattedDate = new FormattedDate(new Date(2021, 0, 17, 0, 0, 0, 0));
        expect(formattedDate.formatDateTime()).to.equal('1/17/21');
    });
});