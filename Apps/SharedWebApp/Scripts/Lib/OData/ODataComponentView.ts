import { Block } from "../Html/Block";
import { MessageAlertView } from "../MessageAlertView";
import { ODataGridView } from "./ODataGridView";

export class ODataComponentView extends Block {
    readonly grid: ODataGridView;
    readonly alert: MessageAlertView;

    constructor() {
        super();
        this.grid = this.addContent(new ODataGridView());
        this.alert = this.addContent(new MessageAlertView());
    }
}