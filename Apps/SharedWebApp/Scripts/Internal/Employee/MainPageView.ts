import { Container } from '../../Lib/Html/Container';
import { CssLengthUnit } from '../../Lib/Html/CssLengthUnit';
import { GridView } from '../../Lib/Html/GridView';
import { TextHeading1View } from '../../Lib/Html/TextHeading1View';
import { Toolbar } from '../../Lib/Html/Toolbar';
import { MessageAlertView } from '../../Lib/MessageAlertView';
import { PaddingCss } from '../../Lib/PaddingCss';
import { PageFrameView } from '../../Lib/PageFrameView';
import { ColumnCss } from '../../Lib/ColumnCss';
import { ButtonCommandItem } from '../../Lib/Command/ButtonCommandItem';
import { ContextualClass } from '../../Lib/ContextualClass';
import { Block } from '../../Lib/Html/Block';
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
        //let fillRow = grid.addContent(new Block());
        //fillRow.setBackgroundContext(ContextualClass.light);
        //fillRow.scrollable();
        //let container = fillRow.addContent(new Container());

        let container = grid.addContent(new Container())
            .configure(b => {
                b.height100();
            })
            .addContent(new Block())
            .configure(b => {
                b.height100();
                b.positionRelative();
            })
            .addContent(new Block())
            .configure(b => {
                b.positionAbsoluteFill();
                b.setBackgroundContext(ContextualClass.light);
                b.scrollable();
            });

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