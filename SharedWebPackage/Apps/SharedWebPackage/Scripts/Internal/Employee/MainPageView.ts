﻿import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { PaddingCss } from '../../Lib/PaddingCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { GridView } from '../../Lib/Views/Grid';
import { MessageAlertView } from '../../Lib/Views/MessageAlertView';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { SharedPageView } from '../SharedPageView';
import { AddEmployeeFormLayout } from './AddEmployeeFormLayout';
import { AddEmployeeFormView } from './AddEmployeeFormView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly alert: MessageAlertView;
    readonly addEmployeeForm: AddEmployeeFormView;
    readonly saveButton: ButtonCommandView;

    constructor() {
        super();
        const grid = this.addView(GridView);
        grid.styleAsLayout();
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        grid.height100();
        const headerRow = grid.addCell();
        this.heading = headerRow.addView(BlockView)
            .configure(b => b.addCssName('container'))
            .addView(TextHeading1View);
        const container = grid.addCell()
            .configure(c => {
                c.addCssName('container');
                c.addCssName('h-100');
            })
            .addView(BlockView)
            .configure(b => {
                b.height100();
                b.positionRelative();
            })
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.setBackgroundContext(ContextualClass.light);
                b.scrollable();
            });
        this.alert = container.addView(MessageAlertView);
        this.addEmployeeForm = container.addView(AddEmployeeFormView);
        this.addEmployeeForm.addContent(new AddEmployeeFormLayout());
        this.addEmployeeForm.addOffscreenSubmit();
        const toolbar = grid.addCell().addView(ToolbarView);
        toolbar.setPadding(PaddingCss.xs(3));
        toolbar.setBackgroundContext(ContextualClass.secondary);
        this.saveButton = toolbar.columnEnd.addView(ButtonCommandView);
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.light);
    }
}