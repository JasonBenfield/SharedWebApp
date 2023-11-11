import { expect } from 'chai';
import 'mocha';
import { ParsedDateObject } from '../Lib/Http/ParsedDateObject';

describe('Parsed Date Object', () => {
    it('Date Strings', function () {
        const str = '{"StartDate": "2001-01-01T00:00:00+00:00"}';
        const parsed = new ParsedDateObject(JSON.parse(str)).value;
        const startDate: Date = parsed.StartDate;
        expect(startDate.getTime()).to.equal(Date.UTC(2001, 0, 1));
    });
});