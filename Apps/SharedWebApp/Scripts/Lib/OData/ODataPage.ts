import { ODataQueryBuilder } from "./ODataQueryBuilder";

export class ODataPage {
    private _page = 1;
    private _startRecord = 0;
    private _numberOfPages = 0;

    constructor(private readonly pageSize: number) {
    }

    get page() { return this._page; }

    pageChanged(page: number, query: ODataQueryBuilder) {
        this._page = page;
        const skip = (page - 1) * this.pageSize;
        this._startRecord = skip + 1;
        query.skip(skip);
        query.top(this.pageSize);
    }

    get startRecord() { return this._startRecord; }

    get numberOfPages() { return this._numberOfPages; }

    countChanged(count: number) {
        this._numberOfPages = Math.ceil(count / this.pageSize);
    }
}