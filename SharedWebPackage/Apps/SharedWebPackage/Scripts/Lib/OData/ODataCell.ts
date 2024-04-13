import { BasicComponent } from "../Components/BasicComponent";
import { GridCellView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";

export class ODataCell extends BasicComponent {
    constructor(
        readonly rowIndex: number,
        readonly column: ODataColumn,
        readonly record: any,
        protected readonly view: GridCellView
    ) {
        super(view);
    }
}