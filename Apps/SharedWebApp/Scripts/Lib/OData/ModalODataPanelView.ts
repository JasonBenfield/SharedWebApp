import { Block } from "../Html/Block";

export class ModalODataPanelView extends Block {
    protected readonly header: Block;
    protected readonly body: Block;
    protected readonly footer: Block;

    constructor() {
        super();
        this.addCssName('d-contents');
        this.header = this.addContent(new Block());
        this.header.addCssName('modal-header');
        this.body = this.addContent(new Block());
        this.body.addCssName('modal-body');
        this.footer = this.addContent(new Block());
        this.footer.addCssName('modal-footer');
    }
}