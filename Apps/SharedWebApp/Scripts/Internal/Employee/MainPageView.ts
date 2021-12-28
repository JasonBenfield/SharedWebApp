import { ColumnCss } from '../../Shared/ColumnCss';
import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { ContextualClass } from '../../Shared/ContextualClass';
import { Block } from '../../Shared/Html/Block';
import { Container } from '../../Shared/Html/Container';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { TextHeading1View } from '../../Shared/Html/TextHeading1View';
import { Toolbar } from '../../Shared/Html/Toolbar';
import { MessageAlertView } from '../../Shared/MessageAlertView';
import { PaddingCss } from '../../Shared/PaddingCss';
import { PageFrameView } from '../../Shared/PageFrameView';
import { AddEmployeeFormView } from './AddEmployeeFormView';
import { AddressInputLayout } from './AddressInputLayout';

export class MainPageView {
    readonly heading: TextHeading1View;
    readonly alert: MessageAlertView;
    readonly addEmployeeForm: AddEmployeeFormView;
    readonly saveButton: ButtonCommandItem;
    readonly submitButton: ButtonCommandItem;

    constructor(private readonly page: PageFrameView) {
        let flexColumn = this.page.addContent(new FlexColumn());
        let headerRow = flexColumn.addContent(new Block());
        headerRow.addContent(new Container());
        this.heading = headerRow.addContent(new TextHeading1View());
        let flexFill = flexColumn.addContent(new FlexColumnFill());
        this.alert = flexFill.addContent(new MessageAlertView());
        this.addEmployeeForm = flexFill.container.addContent(new AddEmployeeFormView());
        let toolbar = flexColumn.addContent(new Toolbar());
        toolbar.setPadding(PaddingCss.xs(3));
        toolbar.setBackgroundContext(ContextualClass.secondary);
        this.saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem());
        this.saveButton.icon.solidStyle();
        this.saveButton.icon.setName('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.light);
        this.submitButton = this.addEmployeeForm.addOffscreenSubmit();
        this.addEmployeeForm.forEachFormGroup(fg => {
            fg.captionColumn.setColumnCss(ColumnCss.xs(4));
        });
        this.addEmployeeForm.Address.useLayout((fg) => new AddressInputLayout(fg));
        //this.addEmployeeForm.submitted.register(this.onFormSubmit.bind(this));
        this.addEmployeeForm.executeLayout();
    }
}