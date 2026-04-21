import { FormattedNumber } from "../FormattedNumber";
import { BaseInputComponentView } from "./InputComponent";
import { ITransformedInput, TransformedInputComponent, TransformedInputComponentViewModel } from "./TransformedInputComponent";

export class NumericTextInputComponentViewModel extends TransformedInputComponentViewModel<number> {
    constructor(initialValue = 0) {
        super(initialValue);
    }
}

export class TransformedNumberInput implements ITransformedInput<number> {
    private _textValueWhenZero = "";
    private _formatString = "";
    private _valueWhenNaN = 0;
    private _numberOfDecimals = -1;

    setNumberOfDecimals(numberOfDecimals: number) {
        this._numberOfDecimals = numberOfDecimals;
        return this;
    }

    fromView(textValue: string) {
        let value: number;
        if (textValue === this._textValueWhenZero) {
            value = 0;
        }
        else {
            value = Number.parseFloat(textValue.replace(/[A-Z,|$]+/ig, ""));
            if (Number.isNaN(value)) {
                value = this._valueWhenNaN;
            }
            else if (this._numberOfDecimals > -1) {
                const powerOfTen = Math.pow(10, this._numberOfDecimals);
                value = Math.round((value + Number.EPSILON) * powerOfTen) / powerOfTen;
            }
        }
        return value;
    }

    setTextValueWhenZero(textValue: string) {
        this._textValueWhenZero = textValue;
        return this;
    }

    setFormatString(formatString: string) {
        this._formatString = formatString;
        return this;
    }

    toView(value: number) {
        let textValue: string;
        if (value === 0) {
            textValue = this._textValueWhenZero;
        }
        else if (this._formatString) {
            textValue = new FormattedNumber(value, this._formatString).format();
        }
        else {
            textValue = value.toLocaleString();
        }
        return textValue;
    }
}

export class NumericTextInputComponent extends TransformedInputComponent<number> {
    constructor(
        viewModel: TransformedInputComponentViewModel<number>,
        view: BaseInputComponentView,
        transformedNumberInput = new TransformedNumberInput()
    ) {
        super(
            viewModel,
            view,
            transformedNumberInput
        );
    }
}