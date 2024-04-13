import { LinkComponent } from "../Components/LinkComponent";
import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { LinkGridRowView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";
import { ODataRow } from "./ODataRow";

export class ODataLinkRow extends ODataRow {
    private readonly linkComponent: LinkComponent;

    constructor(rowIndex: number, columns: ODataColumn[], record: any, view: LinkGridRowView) {
        super(rowIndex, columns, record, view);
        this.linkComponent = new LinkComponent(view);
    }

    setHrefToDoNothing() { this.linkComponent.setHrefToDoNothing(); }

    setHref(href: string | Url | UrlBuilder) { this.linkComponent.setHref(href); }

    setTargetToBlank() { this.linkComponent.setTargetToBlank(); }

}