import { DateOnly } from "../DateOnly";
import { Month } from "../Month";
import { BaseInputComponentView } from "./InputComponent";
import { ITransformedInput, TransformedInputComponent, TransformedInputComponentViewModel } from "./TransformedInputComponent";

export class DateInputComponentViewModel extends TransformedInputComponentViewModel<DateOnly> {
}

class TransformedDateInput implements ITransformedInput<DateOnly> {
    fromView(textValue: string) {
        if (textValue) {
            const match = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Day>\d{2})$/.exec(textValue);
            return match && match.groups ?
                new DateOnly(
                    Number(match.groups.Year),
                    Month.fromValue(Number(match.groups.Month)),
                    Number(match.groups.Day)
                ) :
                DateOnly.max();
        }
        return DateOnly.max();
    }

    toView(value: DateOnly) {
        return value ? value.toISOString() : "";
    }

}

export class DateInputComponent extends TransformedInputComponent<DateOnly> {
    constructor(viewModel: TransformedInputComponentViewModel<DateOnly>, view: BaseInputComponentView) {
        super(
            viewModel,
            view,
            new TransformedDateInput()
        );
        viewModel.inputType = "date";
    }
}