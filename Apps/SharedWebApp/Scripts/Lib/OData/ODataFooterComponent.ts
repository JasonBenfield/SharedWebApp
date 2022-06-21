import { DefaultEvent } from "../Events";
import { TextBlock } from "../Html/TextBlock";
import { ODataFooterComponentView } from "./ODataFooterComponentView";

export class ODataFooterComponent {
    private readonly _pageRequested = new DefaultEvent<number>(this);
    readonly pageRequested = this._pageRequested.handler();

    constructor(private readonly view: ODataFooterComponentView) {
    }

    setPaging(currentPage: number, numberOfPages: number) {
        this.view.clearContents();
        if (numberOfPages > 1) {
            const pages = this.getPages(currentPage, numberOfPages);
            for (const page of pages) {
                if (page > -1) {
                    const pageButton = this.view.addPageButton();
                    pageButton.setText(page.toString());
                    if (page === currentPage) {
                        pageButton.setActive();
                    }
                    pageButton.events.onClick(this.onPageRequested.bind(this, page));
                }
                else {
                    this.view.addEllipsis();
                }
            }
        }
    }

    private onPageRequested(page: number) {
        this._pageRequested.invoke(page);
    }

    private getPages(currentPage: number, numberOfPages: number) {
        const pages: number[] = [];
        pages.push(1);
        const startNear = Math.max(2, currentPage - 2);
        if (startNear > 2) {
            pages.push(-1);
        }
        for (let i = startNear; i < currentPage; i++) {
            pages.push(i);
        }
        if (currentPage > 1) {
            pages.push(currentPage);
        }
        const endNear = Math.min(currentPage + 2, numberOfPages - 1);
        for (let i = currentPage + 1; i <= endNear; i++) {
            pages.push(i);
        }
        if (endNear < numberOfPages - 1) {
            pages.push(-1);
        }
        if (currentPage < numberOfPages) {
            pages.push(numberOfPages);
        }
        return pages;
    }

    setCount(startRecord: number, recordCount: number, total: number) {
        let countText = '';
        if (startRecord === 1 && recordCount === total) {
            countText = total.toLocaleString();
        }
        else {
            countText = `${startRecord.toLocaleString()} to ${recordCount.toLocaleString()} of ${total.toLocaleString()}`;
        }
        new TextBlock(countText, this.view.count);
    }

}