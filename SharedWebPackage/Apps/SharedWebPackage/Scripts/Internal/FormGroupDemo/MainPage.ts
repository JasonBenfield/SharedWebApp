import { AsyncCommand } from '../../Lib/Components/Command';
import { ListGroup, TextListItem } from '../../Lib/Components/ListGroup';
import { MessageAlert } from '../../Lib/Components/MessageAlert';
import { SelectOption } from '../../Lib/Components/SelectOption';
import { ContextualClass } from '../../Lib/ContextualClass';
import { DateOnly } from '../../Lib/DateOnly';
import { DateTimeOffset } from '../../Lib/DateTimeOffset';
import { DelayedAction } from '../../Lib/DelayedAction';
import { EnumerableRange } from '../../Lib/EnumerableRange';
import { FormComponent } from '../../Lib/Forms/FormComponent';
import { FormGroupAlert } from '../../Lib/Forms/FormGroupAlert';
import { FormGroupBooleanInput } from '../../Lib/Forms/FormGroupBooleanInput';
import { FormGroupContainer } from '../../Lib/Forms/FormGroupContainer';
import { FormGroupDateInput } from '../../Lib/Forms/FormGroupDateInput';
import { FormGroupDateTimeInput } from '../../Lib/Forms/FormGroupDateTimeInput';
import { FormGroupInput } from '../../Lib/Forms/FormGroupInput';
import { FormGroupLink } from '../../Lib/Forms/FormGroupLink';
import { FormGroupSelect } from '../../Lib/Forms/FormGroupSelect';
import { FormGroupText } from '../../Lib/Forms/FormGroupText';
import { FormGroupTextArea } from '../../Lib/Forms/FormGroupTextArea';
import { FormGroupTimeInput } from '../../Lib/Forms/FormGroupTimeInput';
import { FormGroupTimeSpanInput } from '../../Lib/Forms/FormGroupTimeSpanInput';
import { TextToNumberViewValue } from '../../Lib/Forms/TextToNumberViewValue';
import { AppClientView } from '../../Lib/Http/AppClientView';
import { AppResourceUrl } from '../../Lib/Http/AppResourceUrl';
import { Month } from '../../Lib/Month';
import { TextListGroupItemView } from '../../Lib/Views/ListGroup';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { MainPageView } from './MainPageView';

class MainPage extends SharedPage {
    private readonly formGroupContainer: FormGroupContainer;
    private readonly demoFormGroupInput: FormGroupInput<string>;
    private readonly demoFormGroupAlert: FormGroupAlert;
    private readonly demoFormGroupSelect: FormGroupSelect<string>;
    private readonly demoFormGroupTextArea: FormGroupTextArea;
    private readonly demoFormGroupText: FormGroupText;
    private readonly demoFormGroupDateInput: FormGroupDateInput;
    private readonly demoFormGroupTimeInput: FormGroupTimeInput;
    private readonly demoFormGroupDateTimeInput: FormGroupDateTimeInput;
    private readonly demoFormGroupTimeSpanInput: FormGroupTimeSpanInput;
    private readonly demoFormGroupInputWithDataList: FormGroupInput<number>;
    private readonly demoFormGroupBooleanInput: FormGroupBooleanInput;
    private readonly demoFormGroupLink: FormGroupLink;
    private readonly alert: MessageAlert;
    private readonly changeAlert: MessageAlert;
    private readonly valueListGroup: ListGroup<TextListItem, TextListGroupItemView>;

    constructor(protected readonly view: MainPageView) {
        super(view);
        this.changeAlert = new MessageAlert(view.changeAlertView);
        const form = new FormComponent(view.formView);
        this.formGroupContainer = form.addFormGroupContainer(view.formGroupContainerView);
        this.demoFormGroupInput = this.formGroupContainer.addFormGroupTextInput(view.demoFormGroupInputView);
        this.demoFormGroupInput.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupInput.setType('email');
        this.demoFormGroupInput.setCaption('Input Field');
        this.demoFormGroupAlert = this.formGroupContainer.addFormGroupAlert(view.demoFormGroupAlertView);
        this.demoFormGroupAlert.setCaption('Alert Field');
        this.demoFormGroupAlert.setContext(ContextualClass.danger);
        this.demoFormGroupAlert.setValue('Alert Value!');
        this.demoFormGroupSelect = this.formGroupContainer.addFormGroupSelect(view.demoFormGroupSelectView);
        this.demoFormGroupSelect.setCaption('Select Field');
        this.demoFormGroupSelect.setItemCaption('Select...');
        this.demoFormGroupSelect.setItems([
            new SelectOption('1', 'Option 1'),
            new SelectOption('2', 'Option 2'),
            new SelectOption('3', 'Option 3')
        ]);
        this.demoFormGroupSelect.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupTextArea = this.formGroupContainer.addFormGroupTextArea(view.demoFormGroupTextAreaView);
        this.demoFormGroupTextArea.setCaption('Text Area Field');
        this.demoFormGroupTextArea.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupText = this.formGroupContainer.addFormGroupText(view.demoFormGroupTextView);
        this.demoFormGroupText.setCaption('Text Field');
        this.demoFormGroupText.setValue('Text Value');
        this.demoFormGroupDateInput = this.formGroupContainer.addFormGroupDateInput(view.demoFormGroupDateInputView);
        this.demoFormGroupDateInput.setCaption('Date Field');
        this.demoFormGroupDateInput.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupTimeInput = this.formGroupContainer.addFormGroupTimeInput(view.demoFormGroupTimeInputView);
        this.demoFormGroupTimeInput.setCaption('Time Input Field');
        this.demoFormGroupTimeInput.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupDateTimeInput = this.formGroupContainer.addFormGroupDateTimeInput(view.demoFormGroupDateTimeInputView);
        this.demoFormGroupDateTimeInput.setCaption('Date Time Input Field');
        this.demoFormGroupDateTimeInput.when.valueChanged.then(this.onChange.bind(this));
        const dateTimeValue = DateTimeOffset.parse('2024-01-04T14:59:11+00:00');
        this.demoFormGroupDateTimeInput.setValue(dateTimeValue);
        console.log(this.demoFormGroupDateTimeInput.getValue().toISOString());
        this.demoFormGroupDateTimeInput.setValue(null);
        this.demoFormGroupTimeSpanInput = this.formGroupContainer.addFormGroupTimeSpanInput(view.demoFormGroupTimeSpanInputView);
        this.demoFormGroupTimeSpanInput.setCaption('Time Span Input Field');
        this.demoFormGroupTimeSpanInput.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupInputWithDataList = this.formGroupContainer.addFormGroupInput(view.demoFormGroupInputWithDataListView, new TextToNumberViewValue('0.0'));
        this.demoFormGroupInputWithDataList.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupInputWithDataList.setCaption('Input With Data List Field');
        this.demoFormGroupInputWithDataList.addDataList(
            ...new EnumerableRange(4, 15).value()
        );
        this.demoFormGroupBooleanInput = this.formGroupContainer.addFormGroupBooleanInput(view.demoFormGroupBooleanInputView);
        this.demoFormGroupBooleanInput.setCaption('Boolean Field');
        this.demoFormGroupBooleanInput.when.valueChanged.then(this.onChange.bind(this));
        this.demoFormGroupLink = this.formGroupContainer.addFormGroupLink(view.demoFormGroupLinkView);
        this.demoFormGroupLink.setCaption('Link Field');
        this.demoFormGroupLink.setValue('Click Here');
        this.demoFormGroupLink.setHref('https://example.com');
        this.demoFormGroupLink.setTargetToBlank();
        this.alert = new MessageAlert(view.alertView);
        this.alert.info('Click "Show Values"', 'Instructions');
        this.valueListGroup = new ListGroup(view.valueListView);
        new AsyncCommand(this.showValues.bind(this)).add(view.showButton);
        const appResourceUrl = AppResourceUrl.app('Fake', 'Current', '', '');
        const args = {
            DateValue: new DateOnly(2024, Month.April, 16),
            DateTimeValue: new DateTimeOffset(2024, Month.April, 16, 18, 30)
        }
        const appClientView = new AppClientView<typeof args>(appResourceUrl, 'DoSomething');
        const url = appClientView.getModifierUrl('', args).value();
        console.log(url);
        console.log(`Today: ${DateOnly.today().dayOfWeek.displayText}`);
        console.log(`Yesterday: ${DateTimeOffset.now().addDays(-1).dayOfWeek.displayText}`);
    }

    private onChange(value) {
        this.changeAlert.info(`[${DateTimeOffset.now().format()}] Value Changed: '${value}'`);
    }

    private async showValues() {
        await this.alert.infoAction(
            'Loading...',
            () => DelayedAction.delay(1000),
            'In Progress'
        );
        const values = this.formGroupContainer.getFormGroups().
            map(fg => `${fg.getCaption()}: ${fg.getValue()}`);
        this.valueListGroup.setItems(values, (v, itemView) => new TextListItem(v, itemView));
        this.alert.success('These are the values:');
        this.demoFormGroupSelect.makeReadOnly();
        this.demoFormGroupInput.makeReadOnly();
        this.demoFormGroupTextArea.makeReadOnly();
        this.demoFormGroupDateInput.makeReadOnly();
        this.demoFormGroupDateTimeInput.makeReadOnly();
        this.demoFormGroupTimeInput.makeReadOnly();
        this.demoFormGroupTimeInput.makeEditable();
        this.demoFormGroupTimeSpanInput.makeReadOnly();
    }
}
new DefaultPageContext().load();
new MainPage(new MainPageView());