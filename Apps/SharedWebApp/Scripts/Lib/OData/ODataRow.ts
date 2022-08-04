import { BasicComponent } from "../Components/BasicComponent";
import { GridRowView } from "../Views/Grid";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";

export class ODataRow extends BasicComponent {
    protected readonly view: GridRowView;

    constructor(rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) {
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