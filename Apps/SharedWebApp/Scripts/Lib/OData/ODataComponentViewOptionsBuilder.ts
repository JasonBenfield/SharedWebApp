import { BasicGridRowView } from "../Views/Grid";
import { ODataComponentViewOptions } from "./ODataComponentViewOptions";

export class ODataComponentViewOptionsBuilder {
    private _configureDataRow: (row: BasicGridRowView) => void = () => { };

    configureDataRow(configureDataRow: (row: BasicGridRowView) => void) {
        this._configureDataRow = configureDataRow;
        return this;
    }

    build() {
        return new ODataComponentViewOptions(this._configureDataRow);
    }
}