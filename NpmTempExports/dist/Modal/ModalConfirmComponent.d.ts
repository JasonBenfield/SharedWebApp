import { ModalConfirmComponentView } from "./ModalConfirmComponentView";
export declare class ModalConfirmComponentResult {
    private readonly results;
    static get confirmed(): ModalConfirmComponentResult;
    static get rejected(): ModalConfirmComponentResult;
    private constructor();
    get confirmed(): {};
    get rejected(): {};
}
export declare class ModalConfirmComponent {
    private readonly view;
    private readonly awaitable;
    private readonly message;
    private readonly title;
    private readonly yesCommand;
    private readonly noCommand;
    constructor(view: ModalConfirmComponentView);
    private onClosed;
    confirm(message: string, title?: string): Promise<boolean>;
    private yes;
    private no;
}
