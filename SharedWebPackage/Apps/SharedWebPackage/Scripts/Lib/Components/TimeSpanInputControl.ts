import { EnumerableRange } from "../EnumerableRange";
import { TextToNumberViewValue } from "../Forms/TextToNumberViewValue";
import { TimeSpan } from "../TimeSpan";
import { TimeSpanInputView } from "../Views/TimeSpanInputView";
import { BasicComponent } from "./BasicComponent";
import { InputControl } from "./InputControl";
import { TextComponent } from "./TextComponent";
import { EventSource } from "../Events";

type Events = { valueChanged: TimeSpan };

export class TimeSpanInputControl extends BasicComponent {
    private readonly dayInputControl: InputControl<number>;
    private readonly dayCaptionTextComponent: TextComponent;
    private readonly hourInputControl: InputControl<number>;
    private readonly hourCaptionTextComponent: TextComponent;
    private readonly minuteInputControl: InputControl<number>;
    private readonly minuteCaptionTextComponent: TextComponent;
    private readonly secondInputControl: InputControl<number>;
    private readonly secondCaptionTextComponent: TextComponent;
    private readonly millisecondInputControl: InputControl<number>;
    private readonly millisecondCaptionTextComponent: TextComponent;
    private isDayIncluded = true;
    private isHourIncluded = true;
    private isMinuteIncluded = true;
    private isSecondIncluded = true;
    private isMillisecondIncluded = true;

    private readonly eventSource = new EventSource<Events>(this, { valueChanged: null as TimeSpan });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: TimeSpanInputView) {
        super(view);
        this.dayInputControl = this.addComponent(new InputControl(view.dayInputView, new TextToNumberViewValue()));
        this.dayCaptionTextComponent = this.addComponent(new TextComponent(view.dayCaptionTextView));
        this.dayCaptionTextComponent.setText('days');
        this.dayCaptionTextComponent.setTitle('days');
        this.hourInputControl = this.addComponent(new InputControl(view.hourInputView, new TextToNumberViewValue()));
        const hours = new EnumerableRange(0, 24).value();
        this.hourInputControl.addDataList(...hours);
        this.hourCaptionTextComponent = this.addComponent(new TextComponent(view.hourCaptionTextView));
        this.hourCaptionTextComponent.setText('hours');
        this.hourCaptionTextComponent.setTitle('hours');
        this.minuteInputControl = this.addComponent(new InputControl(view.minuteInputView, new TextToNumberViewValue()));
        const minutes = new EnumerableRange(0, 60).value();
        this.minuteInputControl.addDataList(...minutes);
        this.minuteCaptionTextComponent = this.addComponent(new TextComponent(view.minuteCaptionTextView));
        this.minuteCaptionTextComponent.setText('mins');
        this.minuteCaptionTextComponent.setTitle('minutes');
        this.secondInputControl = this.addComponent(new InputControl(view.secondInputView, new TextToNumberViewValue()));
        const seconds = new EnumerableRange(0, 60).value();
        this.secondInputControl.addDataList(...seconds);
        this.secondCaptionTextComponent = this.addComponent(new TextComponent(view.secondCaptionTextView));
        this.secondCaptionTextComponent.setText('s');
        this.secondCaptionTextComponent.setTitle('seconds');
        this.millisecondInputControl = this.addComponent(new InputControl(view.millisecondInputView, new TextToNumberViewValue()));
        this.millisecondCaptionTextComponent = this.addComponent(new TextComponent(view.millisecondCaptionTextView));
        this.millisecondCaptionTextComponent.setText('ms');
        this.millisecondCaptionTextComponent.setText('milliseconds');
        this.dayInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.hourInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.minuteInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.secondInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
        this.millisecondInputControl.when.valueChanged.then(this.onValueChanged.bind(this));
    }

    private onValueChanged() {
        const value = this.getValue();
        this.eventSource.events.valueChanged.invoke(value);
    }

    getViewID() { return this.dayInputControl.getViewID(); }

    required() {
        this.dayInputControl.required();
        this.hourInputControl.required();
        this.minuteInputControl.required();
        this.secondInputControl.required();
        this.millisecondInputControl.required();
    }

    notRequired() {
        this.dayInputControl.notRequired();
        this.hourInputControl.notRequired();
        this.minuteInputControl.notRequired();
        this.secondInputControl.notRequired();
        this.millisecondInputControl.notRequired();
    }

    includeDays() {
        this.dayInputControl.show();
        this.dayCaptionTextComponent.show();
        this.isDayIncluded = true;
    }

    excludeDays() {
        this.dayInputControl.hide();
        this.dayCaptionTextComponent.hide();
        this.isDayIncluded = false;
    }

    includeHours() {
        this.hourInputControl.show();
        this.hourCaptionTextComponent.show();
        this.isHourIncluded = true;
    }

    excludeHours() {
        this.hourInputControl.hide();
        this.hourCaptionTextComponent.hide();
        this.isHourIncluded = false;
    }

    includeMinutes() {
        this.minuteInputControl.show();
        this.minuteCaptionTextComponent.show();
        this.isMinuteIncluded = true;
    }

    excludeMinutes() {
        this.minuteInputControl.hide();
        this.minuteCaptionTextComponent.hide();
        this.isMinuteIncluded = false;
    }

    includeSeconds() {
        this.secondInputControl.show();
        this.secondCaptionTextComponent.show();
        this.isSecondIncluded = true;
    }

    excludeSeconds() {
        this.secondInputControl.hide();
        this.secondCaptionTextComponent.hide();
        this.isSecondIncluded = false;
    }

    includeMillieconds() {
        this.millisecondInputControl.show();
        this.millisecondCaptionTextComponent.show();
        this.isMillisecondIncluded = true;
    }

    excludeMilliseconds() {
        this.millisecondInputControl.hide();
        this.millisecondCaptionTextComponent.hide();
        this.isMillisecondIncluded = false;
    }

    getValue() {
        const day = this.isDayIncluded ? this.dayInputControl.getValue() : 0;
        const hour = this.isHourIncluded ? this.hourInputControl.getValue() : 0;
        const minute = this.isMinuteIncluded ? this.minuteInputControl.getValue() : 0;
        const second = this.isSecondIncluded ? this.secondInputControl.getValue() : 0;
        const millisecond = this.isMillisecondIncluded ? this.millisecondInputControl.getValue() : 0;
        if (
            day === null || day === undefined ||
            hour === null || hour === undefined ||
            minute === null || minute === undefined ||
            second === null || second === undefined ||
            millisecond === null || millisecond === undefined
        ) {
            return null;
        }
        const value = new TimeSpan(day, hour, minute, second, millisecond * 10000);
        console.log(`TimeSpanInputControl: value=${value.format()}`);
        return value;
    }

    setValue(value: TimeSpan) {
        if (value) {
            this.dayInputControl.setValue(value.days);
            this.hourInputControl.setValue(value.hours);
            this.minuteInputControl.setValue(value.minutes);
            this.secondInputControl.setValue(value.seconds);
            this.millisecondInputControl.setValue(value.milliseconds);
        }
        else {
            this.dayInputControl.setValue(null);
            this.hourInputControl.setValue(null);
            this.minuteInputControl.setValue(null);
            this.secondInputControl.setValue(null);
            this.millisecondInputControl.setValue(null);
        }
    }

    setCustomValidity(message: string) {
        this.dayInputControl.setCustomValidity(message);
        this.hourInputControl.setCustomValidity(message);
        this.minuteInputControl.setCustomValidity(message);
        this.secondInputControl.setCustomValidity(message);
        this.millisecondInputControl.setCustomValidity(message);
        this.view.setTitle(message);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}