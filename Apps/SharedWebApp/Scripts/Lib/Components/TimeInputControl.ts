import { EnumerableRange } from "../EnumerableRange";
import { TimeOnly } from "../TimeOnly";
import { TimeInputView } from "../Views/TimeInputView";
import { BasicComponent } from "./BasicComponent";
import { SelectControl } from "./SelectControl";
import { SelectOption } from "./SelectOption";
import { TextComponent } from "./TextComponent";
import { EventSource } from "../Events";

type Events = { valueChanged: TimeOnly };

export class TimeInputControl extends BasicComponent {
    private readonly hourSelectControl: SelectControl<number>;
    private readonly hourSeparatorTextComponent: TextComponent;
    private readonly minuteSelectControl: SelectControl<number>;
    private readonly minuteSeparatorTextComponent: TextComponent;
    private readonly secondSelectControl: SelectControl<number>;
    private readonly amPmSelectControl: SelectControl<string>;
    private hasSeconds: boolean;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as TimeOnly });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: TimeInputView) {
        super(view);
        this.hourSelectControl = this.addComponent(new SelectControl(view.hourSelectView));
        const hourOptions = new EnumerableRange(1, 12)
            .value()
            .map(hr => new SelectOption(hr, hr.toString()));
        this.hourSelectControl.setItemCaption('Select...', ...hourOptions);
        this.hourSeparatorTextComponent = this.addComponent(new TextComponent(view.hourSeparatorTextView));
        this.hourSeparatorTextComponent.setText(':');
        this.minuteSelectControl = this.addComponent(new SelectControl(view.minuteSelectView));
        const minuteOptions = new EnumerableRange(0, 60)
            .value()
            .map(min => new SelectOption(min, min.toString()));
        this.minuteSelectControl.setItemCaption('Select...', ...minuteOptions);
        this.minuteSeparatorTextComponent = this.addComponent(new TextComponent(view.minuteSeparatorTextView));
        this.minuteSeparatorTextComponent.setText(':');
        this.secondSelectControl = this.addComponent(new SelectControl(view.secondSelectView));
        const secondOptions = new EnumerableRange(0, 60)
            .value()
            .map(sec => new SelectOption(sec, sec.toString()));
        this.secondSelectControl.setItemCaption('Select...', ...secondOptions);
        this.excludeSeconds();
        this.amPmSelectControl = this.addComponent(new SelectControl(view.amPmSelectView));
        this.amPmSelectControl.setItems(
            new SelectOption('AM', 'AM'),
            new SelectOption('PM', 'PM')
        )
        this.hourSelectControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.minuteSelectControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.secondSelectControl.when.valueChanged.then(this.onValueChanged.bind(this));
    }

    private onValueChanged() {
        const value = this.getValue();
        this.eventSource.events.valueChanged.invoke(value);
    }

    includeSeconds() {
        this.hasSeconds = true;
        this.minuteSeparatorTextComponent.show();
        this.secondSelectControl.show();
        this.view.includeSeconds();
    }

    excludeSeconds() {
        this.hasSeconds = false;
        this.minuteSeparatorTextComponent.hide();
        this.secondSelectControl.hide();
        this.view.excludeSeconds();
    }

    setValue(time: TimeOnly) {
        const hours = time.hours > 12 ? time.hours % 12 : time.hours;
        this.hourSelectControl.setValue(hours);
        this.minuteSelectControl.setValue(time.minutes);
        this.secondSelectControl.setValue(time.seconds);
        const amPm = time.hours > 12 ? 'PM' : 'AM';
        this.amPmSelectControl.setValue(amPm);
    }

    getValue() {
        const hour = this.hourSelectControl.getValue();
        const minute = this.minuteSelectControl.getValue();
        const second = this.hasSeconds ? this.secondSelectControl.getValue() : 0;
        const amPm = this.amPmSelectControl.getValue();
        if (hour === null || minute === null || second === null) {
            return null;
        }
        return new TimeOnly(amPm === 'PM' ? hour + 12 : hour, minute, second);
    }
}