import { GridRowView } from "../Views/Grid";
import { ODataComponentViewOptions } from "./ODataComponentViewOptions";

export class ODataComponentViewOptionsBuilder {
    private _configureDataRow: (row: GridRowView) => void = () => { };

    configureDataRow(configureDataRow: (row: GridRowView) => void) {
        this._configureDataRow = configureDataRow;
        return this;
    }

    build() {
        return new ODataComponentViewOptions(this._configureDataRow);
    }
}