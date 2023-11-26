import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';
import { DateTimeOffset } from '../Lib/DateTimeOffset';
import { ParsedJsonText } from '../Lib/Http/ParsedJsonText';
import { Month } from '../Lib/Month';
import { TimeOnly } from '../Lib/TimeOnly';
import { TimeSpan } from '../Lib/TimeSpan';

describe('Parsed Json Text', () => {
    it('Date Strings', function () {
        const str = '{"StartDate": "2001-01-01T00:00:00+00:00"}';
        const parsed = new ParsedJsonText(str).value;
        expect(parsed.StartDate).to.be.instanceof(DateTimeOffset);
        const startDate: DateTimeOffset = parsed.StartDate;
        expect(startDate.equals(DateTimeOffset.UTC(2001, Month.January, 1))).to.be.true;
    });
    it('DateOnly Strings', function () {
        const str = '{"StartDate": "2023-11-23"}';
        const parsed = new ParsedJsonText(str).value;
        expect(parsed.StartDate).to.be.instanceof(DateOnly);
        const startDate: DateOnly = parsed.StartDate;
        expect(startDate.equals(new DateOnly(2023, Month.November, 23))).to.be.true;
    });
    it('TimeOnly Strings', function () {
        const str = '{"StartTime": "20:45:23.1230000"}';
        const parsed = new ParsedJsonText(str).value;
        expect(parsed.StartTime).to.be.instanceof(TimeOnly);
        const startTime: TimeOnly = parsed.StartTime;
        expect(startTime.equals(new TimeOnly(20, 45, 23, 123))).to.be.true;
    });
    it('TimeSpan Strings', function () {
        const str = '{"TimeElapsed": "1.02:30:04.4560000"}';
        const parsed = new ParsedJsonText(str).value;
        expect(parsed.TimeElapsed).to.be.instanceof(TimeSpan);
        const timeElapsed: TimeSpan = parsed.TimeElapsed;
        expect(timeElapsed.equals(new TimeSpan(1, 2, 30, 4, 4560000))).to.be.true;
    });
});