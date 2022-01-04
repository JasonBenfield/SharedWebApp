import { Label } from "./Label";
import { LabelViewModel } from './LabelViewModel';
import { TextSpanView } from "./TextSpanView";
export declare class TextLabel extends Label implements ITextComponentView {
    readonly textSpan: TextSpanView;
    constructor(vm?: LabelViewModel);
    setText(text: string): void;
    setTitle(title: string): void;
}
