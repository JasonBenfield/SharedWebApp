import { BooleanInputControl } from "../Components/BooleanInputControl";
import { InputControl } from "../Components/InputControl";
import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { TextComponent } from "../Components/TextComponent";
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { RelativeDayOffset, RelativeMonthOffset, RelativeOffset, RelativeYearOffset } from "../RelativeDateRange";
import { RelativeOffsetPickerView } from "./RelativeOffsetPickerView";
import { EventSource } from '../Events';
import { DebouncedAction } from "../DebouncedAction";

enum UnitSelection {
    NotSet = 0,
    Days = 1,
    Months = 2,
    Years = 3
}

export class RelativeOffsetPicker {
    private readonly offsetUnitSelect: SelectControl<UnitSelection>;
    private readonly noOffsetCheck: BooleanInputControl;
    private readonly noOffsetLabel: TextComponent;
    private readonly offsetInput: InputControl<number>;
    private readonly offsetUnit: TextComponent;
    private readonly offsetType: TextComponent;
    private isOffsetNegative = false;

    private readonly events = { valueChanged: null as RelativeOffset };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(private readonly view: RelativeOffsetPickerView) {
        this.offsetUnitSelect = new SelectControl(view.offsetUnitSelect);
        this.offsetUnitSelect.setItems(
            new SelectOption(UnitSelection.Days, 'Days'),
            new SelectOption(UnitSelection.Months, 'Months'),
            new SelectOption(UnitSelection.Years, 'Years')
        );
        this.offsetUnitSelect.when.valueChanged.then(this.onSelectValueChanged.bind(this));
        this.noOffsetCheck = new BooleanInputControl(view.noOffsetCheckInput);
        this.noOffsetLabel = new TextComponent(view.noOffsetCheckLabel);
        this.offsetInput = new InputControl(view.offsetInput, new TextToNumberViewValue());
        this.offsetUnit = new TextComponent(view.offsetUnit);
        this.offsetType = new TextComponent(view.offsetType);
        this.offsetInput.when.valueChanged.then(this.onOffsetInputChanged.bind(this));
        this.noOffsetCheck.when.valueChanged.then(this.onNoOffsetCheckChanged.bind(this));
    }

    private onOffsetInputChanged(value: number) {
        const unitSelection = this.offsetUnitSelect.getValue();
        this.updateOffsetUnit(unitSelection, value);
        this.debouncedValueChanged.execute();
    }

    private onNoOffsetCheckChanged(value: boolean) {
        if (value) {
            this.offsetInput.hide();
        }
        else {
            this.offsetInput.show();
        }
        this.debouncedValueChanged.execute();
    }

    private onSelectValueChanged(unitSelection: UnitSelection) {
        this.updateNoOffsetLabel(unitSelection);
        const offsetValue = this.offsetInput.getValue();
        this.updateOffsetUnit(unitSelection, offsetValue);
        this.debouncedValueChanged.execute();
    }

    private readonly debouncedValueChanged = new DebouncedAction(
        () => {
            const relativeDate = this.getValue();
            this.eventSource.events.valueChanged.invoke(relativeDate);
        },
        700
    );

    private updateNoOffsetLabel(unitSelection: UnitSelection) {
        if (unitSelection === UnitSelection.NotSet) {
            this.noOffsetLabel.setText('');
        }
        else {
            const formattedOffsetUnit = this.formatOffsetUnit(unitSelection, 1);
            this.noOffsetLabel.setText(`Same ${formattedOffsetUnit}`);
        }
    }

    private updateOffsetUnit(unitSelection: UnitSelection, offsetValue: number) {
        const formattedOffsetUnit = this.formatOffsetUnit(unitSelection, offsetValue);
        this.offsetUnit.setText(formattedOffsetUnit);
    }

    private formatOffsetUnit(selection: UnitSelection, value: number) {
        let formatted = '';
        if (selection === UnitSelection.Days) {
            formatted = 'day';
        }
        else if (selection === UnitSelection.Months) {
            formatted = 'month';
        }
        else if (selection === UnitSelection.Years) {
            formatted = 'year';
        }
        if (value !== 1) {
            formatted += 's';
        }
        return formatted;
    }

    offsetIsNegative() {
        this.isOffsetNegative = true;
        this.offsetType.setText('ago');
    }

    offsetIsPositive() {
        this.isOffsetNegative = false;
        this.offsetType.setText('later');
    }

    setValue(relativeOffset: RelativeOffset) {
        if (relativeOffset) {
            if (relativeOffset instanceof RelativeDayOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Days);
                this.noOffsetCheck.setValue(relativeOffset.dayOffset === 0);
                this.offsetInput.setValue(relativeOffset.dayOffset);
            }
            else if (relativeOffset instanceof RelativeMonthOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Months);
                this.noOffsetCheck.setValue(relativeOffset.monthOffset === 0);
                this.offsetInput.setValue(relativeOffset.monthOffset);
            }
            else if (relativeOffset instanceof RelativeYearOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Years);
                this.noOffsetCheck.setValue(relativeOffset.yearOffset === 0);
                this.offsetInput.setValue(relativeOffset.yearOffset);
            }
        }
        else {
            this.offsetUnitSelect.setValue(UnitSelection.NotSet);
            this.offsetInput.setValue(0);
        }
        const offsetValue = this.offsetInput.getValue();
        const unitSelection = this.offsetUnitSelect.getValue();
        this.updateOffsetUnit(unitSelection, offsetValue);
        this.updateNoOffsetLabel(unitSelection);
    }

    getValue() {
        let relativeOffset: RelativeOffset;
        const unitSelection = this.offsetUnitSelect.getValue();
        if (unitSelection === UnitSelection.NotSet) {
            relativeOffset = null;
        }
        else {
            const offsetValue = this.getOffsetValue();
            if (unitSelection === UnitSelection.Days) {
                relativeOffset = new RelativeDayOffset(offsetValue);
            }
            else if (unitSelection === UnitSelection.Months) {
                const dayOfMonth = 0;
                relativeOffset = new RelativeMonthOffset(offsetValue, dayOfMonth);
            }
            else if (unitSelection === UnitSelection.Years) {
                const month = 0;
                const dayOfMonth = 0;
                relativeOffset = new RelativeYearOffset(offsetValue, month, dayOfMonth);
            }
        }
        return relativeOffset;
    }

    private getOffsetValue() {
        let offsetValue = this.noOffsetCheck.getValue()
            ? 0
            : this.offsetInput.getValue();
        if (this.isOffsetNegative && offsetValue) {
            offsetValue = -offsetValue;
        }
        return offsetValue;
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}