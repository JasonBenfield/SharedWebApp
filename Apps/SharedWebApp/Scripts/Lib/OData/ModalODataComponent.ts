import { SingleActivePanel } from "../Panel/SingleActivePanel";
import { ModalODataComponentView } from "./ModalODataComponentView";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { SelectFieldsPanel } from "./SelectFieldsPanel";

export class ModalODataComponent {
    private readonly panels = new SingleActivePanel();
    readonly selectFieldsPanel: SelectFieldsPanel;

    readonly closed: IEventHandler<any>;

    constructor(
        query: ODataQueryBuilder,
        columns: ODataColumnAccessor,
        private readonly view: ModalODataComponentView
    ) {
        this.selectFieldsPanel = this.panels.add(
            new SelectFieldsPanel(query.select, columns, view.selectFieldsPanel)
        );
        this.closed = view.closed;
    }

    private async activateSelectFieldsPanel() {
        this.panels.activate(this.selectFieldsPanel);
        let result = await this.selectFieldsPanel.start();
        if (result.done) {
            this.hide();
        }
    }

    showSelect() {
        this.view.showModal();
        this.activateSelectFieldsPanel();
    }

    hide() { this.view.hideModal(); }
}