import * as ko from 'knockout';

export class FieldCaptionViewModel implements IFieldCaptionViewModel {
    readonly caption = ko.observable<string>('');
    readonly css = ko.observable<string>('');
    readonly isVisible = ko.observable<boolean>(true);
}
