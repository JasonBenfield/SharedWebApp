import { BasicComponentView } from "../Views/BasicComponentView";
import { GridCellView, GridRowView } from "../Views/Grid";
import { EventSource } from '../Events';

export class ODataHeaderRowView extends GridRowView {
    private readonly events = {
        sortClicked: null as GridCellView,
        filterClicked: null as GridCellView
    };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(container: BasicComponentView) {
        super(container);
        this.configureClick(b => b.select('.odata-sort-button,.grid-cell'));
        this.handleClick(this.onClick.bind(this));
    }

    private onClick(sourceView: GridCellView, sourceElement: HTMLElement) {
        if (sourceElement.classList.contains('odata-sort-button')) {
            this.eventSource.events.sortClicked.invoke(sourceView);
        }
        else {
            this.eventSource.events.filterClicked.invoke(sourceView);
        }
    }

}