import { expect } from 'chai';
import 'mocha';
import { DateOnly } from '../Lib/DateOnly';
import { Month } from '../Lib/Month';
import { AppClientView } from '../Lib/Http/AppClientView';
import { AppResourceUrl } from '../Lib/Http/AppResourceUrl';
import { DateTimeOffset } from '../Lib/DateTimeOffset';

describe('AppClientValue', () => {
    it('getModifierUrl', function () {
        const appResourceUrl = AppResourceUrl.app('Fake', 'Current', '', '');
        const args = {
            DateValue: new DateOnly(2024, Month.April, 16),
            DateTimeValue: new DateTimeOffset(2024, Month.April, 16, 18, 30)
        }
        const appClientView = new AppClientView<typeof args>(appResourceUrl, 'DoSomething');
        const url = appClientView.getModifierUrl('', args).value();
        expect(url).to.equal('/Fake/Current/DoSomething?DateValue=2024-04-16&DateTimeValue=2024-04-16T18:30:00.000000Z');
    });
});