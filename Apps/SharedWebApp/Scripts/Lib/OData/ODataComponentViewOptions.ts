import { GridRowView } from "../Views/Grid";

export class ODataComponentViewOptions {
    constructor(
        readonly configureDataRow: (row: GridRowView) => void
    ) {
    }
}