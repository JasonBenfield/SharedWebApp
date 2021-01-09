import * as ko from 'knockout';
import { DefaultEvent, DefaultEventHandler } from '../Events';
import { RowFieldValueTemplate } from './RowFieldValueTemplate';

export class FieldValueViewModel implements IFieldValueViewModel {
    constructor() {
        let template = new RowFieldValueTemplate();
        this.componentName(template.componentName);
        template.register();
    }

    readonly componentName = ko.observable('');
    readonly inputComponentName = ko.observable('');
    readonly name = ko.observable<string>('');
    readonly css = ko.observable<string>('');
    readonly value = ko.observable<any>(null);
    readonly isEnabled = ko.observable<boolean>(true);
    readonly isVisible = ko.observable<boolean>(true);
    readonly errors = ko.observableArray<IErrorModel>([]);
    readonly hasError = ko.observable<boolean>(false);

    private readonly _changed = new DefaultEvent<string>(this);
    readonly changed = new DefaultEventHandler(this._changed);

    protected change(value: string) {
        this._changed.invoke(value);
    }
}

export class ComplexFieldValueViewModel extends FieldValueViewModel {
    private readonly values: IFieldValueViewModel[] = [];

    protected addValue<T extends IFieldViewModel>(field: T) {
        this.values.push(field.value);
        field.value.changed.register(this.change.bind(this));
        return field;
    }

}
