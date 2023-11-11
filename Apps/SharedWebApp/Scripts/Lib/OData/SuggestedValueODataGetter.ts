import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { FilterConditionFunction, FilterConditionOperation, FilterField, FilterStringValue } from "./ODataQueryFilterBuilder";
import { IODataClient, ISuggestedValueGetter } from "./Types";

export class SuggestedValueODataGetter implements ISuggestedValueGetter {
    private ignoreCase: boolean;
    private valuesToExclude: string[] = [];

    constructor(
        private readonly odataClient: IODataClient<any>,
        private readonly fieldName: string,
        private readonly top = 25
    ) {
    }

    exclude(values: string[]) {
        this.valuesToExclude.splice(0, this.valuesToExclude.length, ...values);
    }

    setIgnoreCase(ignoreCase: boolean) {
        this.ignoreCase = ignoreCase;
    }

    async getSuggestedValues(inputValue: string) {
        const query = new ODataQueryBuilder();
        const filter = query.apply.addFilter();
        if (inputValue) {
            const condition = FilterConditionFunction.contains(
                new FilterField(this.fieldName),
                new FilterStringValue(this.ignoreCase, inputValue)
            );
            filter.add(condition);
        }
        if (this.valuesToExclude.length > 0) {
            filter.add(
                FilterConditionOperation.isNotIn(
                    new FilterField(this.fieldName),
                    new FilterStringValue(this.ignoreCase, this.valuesToExclude)
                )
            );
        }
        query.apply.addGroupBy().addField(this.fieldName);
        const odataResult = await this.odataClient.execute(query.build());
        const records = odataResult.records.length > this.top
            ? odataResult.records.slice(0, this.top - 1)
            : odataResult.records;
        return records.map(r => r[this.fieldName]);
    }
}