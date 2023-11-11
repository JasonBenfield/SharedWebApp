import { BasicComponent } from "../Components/BasicComponent";
import { BasicGridRowView, GridRowView } from "../Views/Grid";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";

export class ODataRow extends BasicComponent {
    protected readonly view: BasicGridRowView;

    constructor(rowIndex: number, columns: ODataColumn[], record: any, view: BasicGridRowView) {
        super(view);
        let i = 0;
        for (const column of columns) {
            const cell = record
                ? column.createDataCell(rowIndex, record, view.cell(i)) 
                : column.createHeaderCell(view.cell(i));
            this.addComponent(cell);
            i++;
        }
    }

    getCellByElement(element: HTMLElement) { return this.getComponentByElement(element) as ODataCell; }

}