import { BasicComponent } from "../Components/BasicComponent";
import { TextButtonComponent } from "../Components/TextButtonComponent";
import { ButtonGroup } from "../Components/ButtonGroup";
import { TextComponent } from "../Components/TextComponent";
import { EventSource } from "../Events";
import { ODataFooterComponentView } from "./ODataFooterComponentView";

export class ODataFooterComponent extends BasicComponent {
    protected readonly view: ODataFooterComponentView;
    private readonly pageButtonGroup: ButtonGroup;
    private readonly countText: TextComponent;
    private readonly _events = { pageRequested: null as number };
    private readonly eventSource = new EventSource<typeof this._events>(this, this._events);
    readonly when = this.eventSource.when;

    constructor(view: ODataFooterComponentView) {
        super(view);
        this.pageButtonGroup = this.addComponent(new ButtonGroup(view.pageButtonGroup));
        this.pageButtonGroup.when.buttonClicked.then(this.onPageButtonClicked.bind(this));
        this.countText = this.addComponent(new TextComponent(this.view.count));
    }

    private onPageButtonClicked(button: TextButtonComponent) {
        this.eventSource.events.pageRequested.invoke(button.data as number);
    }

    setPaging(currentPage: number, numberOfPages: number) {
        this.pageButtonGroup.clearItems();
        if (numberOfPages > 1) {
            const pages = this.getPages(currentPage, numberOfPages);
            for (const page of pages) {
                if (page > -1) {
                    const pageButton = this.pageButtonGroup.addTextButton();
                    pageButton.data = page;
                    pageButton.setText(page.toString());
                    if (page === currentPage) {
                        pageButton.setActive();
                    }
                }
                else {
                    this.pageButtonGroup.addText().setText('...');
                }
            }
        }
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
        if (total > 0) {
            if (startRecord === 1 && recordCount === total) {
                countText = total.toLocaleString();
            }
            else {
                countText = `${startRecord.toLocaleString()} to ${recordCount.toLocaleString()} of ${total.toLocaleString()}`;
            }
        }
        this.countText.setText(countText);
    }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}