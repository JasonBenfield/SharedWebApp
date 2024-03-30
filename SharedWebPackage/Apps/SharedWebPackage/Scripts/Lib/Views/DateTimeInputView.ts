import { BasicComponentView } from "./BasicComponentView";
import { InputGroupView } from "./InputGroupView";
import { InputView } from "./InputView";

export class DateTimeInputView extends InputGroupView {
    readonly dateInputView: InputView;
    readonly timeInputView: InputView;

    constructor(container: BasicComponentView) {
        super(container);
        this.dateInputView = this.appendFormControl(InputView);
        this.timeInputView = this.appendFormControl(InputView);
    }

    styleAsFormControl() {
        this.dateInputView.styleAsFormControl();
        this.timeInputView.styleAsFormControl();
    }

    required() {
        this.dateInputView.required();
        this.timeInputView.required();
    }

    notRequired() {
        this.dateInputView.notRequired();
        this.timeInputView.notRequired();
    }
}