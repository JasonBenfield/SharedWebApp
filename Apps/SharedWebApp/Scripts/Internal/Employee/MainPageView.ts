import { ColumnCss } from '../../Shared/ColumnCss';
import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { ContextualClass } from '../../Shared/ContextualClass';
import { FlexCss } from '../../Shared/FlexCss';
import { Block } from '../../Shared/Html/Block';
import { BlockViewModel } from '../../Shared/Html/BlockViewModel';
import { Container } from '../../Shared/Html/Container';
import { CssLengthUnit } from '../../Shared/Html/CssLengthUnit';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { GridView } from '../../Shared/Html/GridView';
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

    constructor(page: PageFrameView) {
        let grid = page.addContent(new GridView());
        grid.borderless();
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        grid.height100();
        let headerRow = grid.addContent(new Block());
        this.heading = headerRow.addContent(new Container())
            .addContent(new TextHeading1View());
        let fillRow = grid.addContent(new Block());
        fillRow.setBackgroundContext(ContextualClass.light);
        fillRow.scrollable();
        let container = fillRow.addContent(new Container());
        this.alert = container.addContent(new MessageAlertView());
        this.addEmployeeForm = container.addContent(new AddEmployeeFormView());
        let toolbar = grid.addContent(new Toolbar());
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
        this.addEmployeeForm.executeLayout();
    }
}