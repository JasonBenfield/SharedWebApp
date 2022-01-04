import { BlockViewModel } from "./BlockViewModel";
import { PlainTextFormGroupView } from "./PlainTextFormGroupView";
import { TextBlockView } from "./TextBlockView";
export declare class TextValueFormGroupView extends PlainTextFormGroupView {
    readonly valueText: TextBlockView;
    constructor(vm?: BlockViewModel);
}
