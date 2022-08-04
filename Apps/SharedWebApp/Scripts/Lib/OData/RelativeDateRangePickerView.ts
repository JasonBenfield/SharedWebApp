import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { FormCheckView } from "../Views/FormCheckView";
import { GridCellView, GridTemplateCss, GridTemplateCssValue } from "../Views/Grid";
import { IGridStyle } from "../Views/Types";
import { RelativeOffsetPickerView } from "./RelativeOffsetPickerView";

export class RelativeDateRangePickerView extends BasicComponentView {
    readonly fromCheck: FormCheckView;
    readonly fromOffsetPicker: RelativeOffsetPickerView;
    readonly toCheck: FormCheckView;
    readonly toRelativeToFromCheck: FormCheckView;
    readonly toOffsetPicker: RelativeOffsetPickerView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-layout');
        this.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        this.fromCheck = this.addView(GridCellView)
            .configure(cell => cell.setGridColumn(1,-1))
            .addView(FormCheckView);
        this.fromCheck.labelText.setText('From');
        this.fromCheck.setMargin(MarginCss.bottom(3));
        this.fromCheck.styleAsSwitch();
        this.fromOffsetPicker = this.addView(RelativeOffsetPickerView);
        this.toCheck = this.addView(GridCellView)
            .configure(cell => cell.setGridColumn(1, -1))
            .addView(FormCheckView);
        this.toCheck.labelText.setText('Until');
        this.toCheck.setMargin(MarginCss.xs({ top: 3, bottom: 3}));
        this.toCheck.styleAsSwitch();
        this.toRelativeToFromCheck = this.addView(GridCellView)
            .configure(cell => cell.setGridColumn(1, -1))
            .addView(FormCheckView);
        this.toRelativeToFromCheck.labelText.setText('Relative to Start Date');
        this.toRelativeToFromCheck.setMargin(MarginCss.bottom(3));
        this.toRelativeToFromCheck.styleAsSwitch();
        this.toOffsetPicker = this.addView(RelativeOffsetPickerView);
        this.toOffsetPicker.setMargin(MarginCss.bottom(3));
    }

    setViewID(id: string) {
        super.setViewID(id);
        this.fromCheck.setInputID(`${id}_from`);
        this.toRelativeToFromCheck.setInputID(`${id}_relativeToStartDate`);
        this.toCheck.setInputID(`${id}_to`);
        this.fromOffsetPicker.setViewID(`${id}_fromOffsetPicker`);
        this.toOffsetPicker.setViewID(`${id}_toOffsetPicker`);
    }

    protected setStyle: (config: (style: IGridStyle) => void) => void;

    private setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...columns).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

}