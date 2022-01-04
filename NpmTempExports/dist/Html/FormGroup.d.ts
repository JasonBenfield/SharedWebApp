import { FormGroupView } from "./FormGroupView";
export declare class FormGroup {
    private caption;
    private readonly captionText;
    constructor(view: FormGroupView);
    getCaption(): string;
    setCaption(caption: string): void;
}
