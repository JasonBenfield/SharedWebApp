import { AsyncCommand } from '../../Lib/Components/Command';
import { ListGroup, TextListItem } from '../../Lib/Components/ListGroup';
import { MessageAlert } from '../../Lib/Components/MessageAlert';
import { SelectOption } from '../../Lib/Components/SelectOption';
import { ContextualClass } from '../../Lib/ContextualClass';
import { DelayedAction } from '../../Lib/DelayedAction';
import { FormGroupAlert } from '../../Lib/Forms/FormGroupAlert';
import { FormGroupDateInput } from '../../Lib/Forms/FormGroupDateInput';
import { FormGroupDateTimeInput } from '../../Lib/Forms/FormGroupDateTimeInput';
import { FormGroupInput } from '../../Lib/Forms/FormGroupInput';
import { FormGroupSelect } from '../../Lib/Forms/FormGroupSelect';
import { FormGroupText } from '../../Lib/Forms/FormGroupText';
import { FormGroupTextArea } from '../../Lib/Forms/FormGroupTextArea';
import { FormGroupTimeInput } from '../../Lib/Forms/FormGroupTimeInput';
import { TextToTextViewValue } from '../../Lib/Forms/TextToTextViewValue';
import { TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { MainPageView } from './MainPageView';

class MainPage extends SharedPage {
    private readonly demoFormGroupInput: FormGroupInput<string>;
    private readonly demoFormGroupAlert: FormGroupAlert;
    private readonly demoFormGroupSelect: FormGroupSelect<string>;
    private readonly demoFormGroupTextArea: FormGroupTextArea;
    private readonly demoFormGroupText: FormGroupText;
    private readonly demoFormGroupDateInput: FormGroupDateInput;
    private readonly demoFormGroupTimeInput: FormGroupTimeInput;
    private readonly demoFormGroupDateTimeInput: FormGroupDateTimeInput;
    private readonly alert: MessageAlert;
    private readonly valueListGroup: ListGroup<TextListItem, TextListGroupItemView>;

    constructor(protected readonly view: MainPageView) {
        super(view);
        this.demoFormGroupInput = new FormGroupInput(view.demoFormGroupInputView, new TextToTextViewValue());
        this.demoFormGroupInput.setCaption('Input Field');
        this.demoFormGroupAlert = new FormGroupAlert(view.demoFormGroupAlertView);
        this.demoFormGroupAlert.setCaption('Alert Field');
        this.demoFormGroupAlert.setContext(ContextualClass.danger);
        this.demoFormGroupAlert.setValue('Alert Value!');
        this.demoFormGroupSelect = new FormGroupSelect(view.demoFormGroupSelectView);
        this.demoFormGroupSelect.setCaption('Select Field');
        this.demoFormGroupSelect.setItemCaption('Select...');
        this.demoFormGroupSelect.setItems(
            new SelectOption('1', 'Option 1'),
            new SelectOption('2', 'Option 2'),
            new SelectOption('3', 'Option 3')
        );
        this.demoFormGroupTextArea = new FormGroupTextArea(view.demoFormGroupTextAreaView);
        this.demoFormGroupTextArea.setCaption('Text Area Field');
        this.demoFormGroupText = new FormGroupText(view.demoFormGroupTextView);
        this.demoFormGroupText.setCaption('Text Field');
        this.demoFormGroupText.setValue('Text Value');
        this.demoFormGroupDateInput = new FormGroupDateInput(view.demoFormGroupDateInputView);
        this.demoFormGroupDateInput.setCaption('Date Field');
        this.demoFormGroupTimeInput = new FormGroupTimeInput(view.demoFormGroupTimeInputView);
        this.demoFormGroupTimeInput.setCaption('Time Input Field');
        this.demoFormGroupDateTimeInput = new FormGroupDateTimeInput(view.demoFormGroupDateTimeInputView);
        this.demoFormGroupDateTimeInput.setCaption('Date Time Input Field');
        this.alert = new MessageAlert(view.alertView);
        this.alert.info('Click "Show Values"', 'Instructions');
        this.valueListGroup = new ListGroup(view.valueListView);
        new AsyncCommand(this.showValues.bind(this)).add(view.showButton);
    }

    private async showValues() {
        await this.alert.infoAction(
            'Loading...',
            () => DelayedAction.delay(1000),
            'In Progress'
        );
        const values = [
            this.demoFormGroupInput,
            this.demoFormGroupAlert,
            this.demoFormGroupSelect,
            this.demoFormGroupTextArea,
            this.demoFormGroupText,
            this.demoFormGroupDateInput,
            this.demoFormGroupTimeInput,
            this.demoFormGroupDateTimeInput
        ].map(fg => `${fg.getCaption()}: ${fg.getValue()}`);
        this.valueListGroup.setItems(values, (v, itemView) => new TextListItem(v, itemView));
        this.alert.success('These are the values:');
        this.demoFormGroupSelect.makeReadOnly();
        this.demoFormGroupInput.makeReadOnly();
        this.demoFormGroupTextArea.makeReadOnly();
        this.demoFormGroupDateInput.makeReadOnly();
        this.demoFormGroupDateTimeInput.makeReadOnly();
        this.demoFormGroupTimeInput.makeReadOnly();
    }
}
new DefaultPageContext().load();
new MainPage(new MainPageView());