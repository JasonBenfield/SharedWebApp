import { BooleanInputControl } from "../Components/BooleanInputControl";
import { InputControl } from "../Components/InputControl";
import { SelectControl } from "../Components/SelectControl";
import { SelectOption } from "../Components/SelectOption";
import { TextComponent } from "../Components/TextComponent";
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { DayOfMonth, DaysOfMonth, RelativeDayOffset, RelativeMonthOffset, RelativeOffset, RelativeYearOffset } from "../RelativeDateRange";
import { RelativeOffsetPickerView } from "./RelativeOffsetPickerView";
import { EventSource } from '../Events';
import { DebouncedAction } from "../DebouncedAction";
import { BasicComponent } from "../Components/BasicComponent";
import { FormCheck } from "../Components/FormCheck";
import { MappedArray } from "../Enumerable";
import { FormattedDate } from "../FormattedDate";

enum UnitSelection {
    NotSet = 0,
    Days = 1,
    Months = 2,
    Years = 3
}

type Events = { valueChanged: RelativeOffset };

export class RelativeOffsetPicker extends BasicComponent {
    protected readonly view: RelativeOffsetPickerView;
    private readonly offsetUnitSelect: SelectControl<UnitSelection>;
    private readonly noOffsetCheck: FormCheck;
    private readonly offsetInput: InputControl<number>;
    private readonly offsetUnit: TextComponent;
    private readonly offsetType: TextComponent;
    private isOffsetNegative = false;
    private readonly months: Date[] = [];
    private readonly monthSelect: SelectControl<Date>;
    private readonly daysOfMonth: DaysOfMonth;
    private readonly dayOfMonthSelect: SelectControl<DayOfMonth>;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as RelativeOffset });
    readonly when = this.eventSource.when;

    constructor(view: RelativeOffsetPickerView) {
        super(view);
        this.offsetUnitSelect = this.addComponent(new SelectControl(view.offsetUnitSelect));
        this.offsetUnitSelect.setItems(
            new SelectOption(UnitSelection.Days, 'Days'),
            new SelectOption(UnitSelection.Months, 'Months'),
            new SelectOption(UnitSelection.Years, 'Years')
        );
        this.offsetUnitSelect.when.valueChanged.then(this.onUnitSelectionChanged.bind(this));
        this.noOffsetCheck = this.addComponent(new FormCheck(view.noOffsetCheck));
        this.offsetInput = this.addComponent(new InputControl(view.offsetInput, new TextToNumberViewValue()));
        this.offsetUnit = new TextComponent(view.offsetUnit);
        this.offsetType = new TextComponent(view.offsetType);
        this.offsetIsNegative();
        this.dayOfMonthSelect = this.addComponent(new SelectControl(view.dayOfMonthSelect));
        for (let month = 0; month < 12; month++) {
            this.months.push(new Date(2022, month, 1));
        }
        const monthOptions = new MappedArray(
            this.months,
            m => new SelectOption(m, new FormattedDate(m, { month: 'long' }).formatDate())
        ).value();
        this.monthSelect = this.addComponent(new SelectControl(view.monthSelect));
        this.monthSelect.setItems(...monthOptions);
        this.daysOfMonth = new DaysOfMonth();
        const daysOfMonthOptions = new MappedArray(
            this.daysOfMonth.values,
            d => new SelectOption(d, d.format())
        ).value();
        this.dayOfMonthSelect.setItems(...daysOfMonthOptions);
        this.setValue(null);
        this.offsetInput.when.valueChanged.then(this.onOffsetInputChanged.bind(this));
        this.noOffsetCheck.when.valueChanged.then(this.onNoOffsetCheckChanged.bind(this));
        this.monthSelect.when.valueChanged.then(this.onMonthChanged.bind(this));
        this.dayOfMonthSelect.when.valueChanged.then(this.onDayOfMonthChanged.bind(this));
    }

    private onOffsetInputChanged(value: number) {
        const unitSelection = this.offsetUnitSelect.getValue();
        this.updateOffsetUnit(unitSelection, value);
        this.debouncedValueChanged.execute();
    }

    private onNoOffsetCheckChanged(value: boolean) {
        this.updateOffsetVisibility(value);
        if (!value) {
            this.offsetInput.setValue(1);
            this.offsetInput.setFocus();
        }
        this.debouncedValueChanged.execute();
    }

    private onMonthChanged() {
        this.debouncedValueChanged.execute();
    }

    private onDayOfMonthChanged() {
        this.debouncedValueChanged.execute();
    }

    private updateOffsetVisibility(value: boolean) {
        if (value) {
            this.offsetInput.hide();
            this.offsetUnit.hide();
            this.offsetType.hide();
        }
        else {
            this.offsetInput.show();
            this.offsetUnit.show();
            this.offsetType.show();
        }
    }

    private onUnitSelectionChanged(unitSelection: UnitSelection) {
        this.updateNoOffsetLabel(unitSelection);
        const offsetValue = this.offsetInput.getValue();
        this.updateOffsetUnit(unitSelection, offsetValue);
        this.updateMonthVisibility(unitSelection);
        if (unitSelection === UnitSelection.Years) {
            this.monthSelect.setValue(this.months[0]);
        }
        if (unitSelection === UnitSelection.Years || unitSelection === UnitSelection.Months) {
            this.dayOfMonthSelect.setValue(this.daysOfMonth.value(new DayOfMonth(1)));
        }
        this.updateDayOfMonthVisibility(unitSelection);
        this.debouncedValueChanged.execute();
    }

    private updateMonthVisibility(unitSelection: UnitSelection) {
        if (unitSelection === UnitSelection.Years) {
            this.view.showMonth();
        }
        else {
            this.view.hideMonth();
        }
    }

    private updateDayOfMonthVisibility(unitSelection: UnitSelection) {
        if (unitSelection === UnitSelection.Months || unitSelection === UnitSelection.Years) {
            this.view.showDayOfMonth();
        }
        else {
            this.view.hideDayOfMonth();
        }
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
            this.noOffsetCheck.setText('');
        }
        else {
            const formattedOffsetUnit = this.formatOffsetUnit(unitSelection, 1);
            this.noOffsetCheck.setText(`Same ${formattedOffsetUnit}`);
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
        let isNoOffset: boolean = false;
        if (relativeOffset) {
            if (relativeOffset instanceof RelativeDayOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Days);
                isNoOffset = relativeOffset.dayOffset === 0;
                this.noOffsetCheck.setValue(isNoOffset);
                this.offsetInput.setValue(relativeOffset.dayOffset);
            }
            else if (relativeOffset instanceof RelativeMonthOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Months);
                isNoOffset = relativeOffset.monthOffset === 0;
                this.noOffsetCheck.setValue(isNoOffset);
                this.offsetInput.setValue(relativeOffset.monthOffset);
                this.dayOfMonthSelect.setValue(this.daysOfMonth.value(relativeOffset.dayOfMonth));
            }
            else if (relativeOffset instanceof RelativeYearOffset) {
                this.offsetUnitSelect.setValue(UnitSelection.Years);
                isNoOffset = relativeOffset.yearOffset === 0;
                this.noOffsetCheck.setValue(isNoOffset);
                this.offsetInput.setValue(relativeOffset.yearOffset);
                this.monthSelect.setValue(this.months[relativeOffset.month]);
                this.dayOfMonthSelect.setValue(this.daysOfMonth.value(relativeOffset.dayOfMonth));
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
        this.updateOffsetVisibility(isNoOffset);
        this.updateMonthVisibility(unitSelection);
        this.updateDayOfMonthVisibility(unitSelection);
    }

    setFocus() {
        const isNoOffset = this.noOffsetCheck.getValue();
        if (!isNoOffset) {
            this.offsetInput.setFocus();
        }
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
                const dayOfMonth = this.dayOfMonthSelect.getValue();
                relativeOffset = new RelativeMonthOffset(offsetValue, dayOfMonth);
            }
            else if (unitSelection === UnitSelection.Years) {
                const month = this.monthSelect.getValue().getMonth();
                const dayOfMonth = this.dayOfMonthSelect.getValue();
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

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}