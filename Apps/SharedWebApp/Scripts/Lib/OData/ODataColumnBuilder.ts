import { ODataColumn } from "./ODataColumn";
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { SourceType } from "./SourceType";

export class ODataColumnBuilder {
    constructor(
        private readonly columnName: string,
        private readonly sourceType: SourceType,
        private readonly view: ODataColumnViewBuilder
    ) {
    }

    build() {
        return new ODataColumn(
            this.columnName,
            this.sourceType,
            this.view.build()
        );
    }
}