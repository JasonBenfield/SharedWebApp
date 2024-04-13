import { BlockView } from "../Views/BlockView";
import { ModalComponentView } from "../Views/Modal";

export class ModalODataPanelView {
    readonly header: BlockView;
    readonly body: BlockView;
    readonly footer: BlockView;

    constructor(modal: ModalComponentView) {
        this.header = modal.header.addView(BlockView);
        this.body = modal.body.addView(BlockView);
        this.footer = modal.footer.addView(BlockView);
    }

    show() {
        this.header.show();
        this.body.show();
        this.footer.show();
    }

    hide() {
        this.header.hide();
        this.body.hide();
        this.footer.hide();
    }
}