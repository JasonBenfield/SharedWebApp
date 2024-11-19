import { BasicComponentView } from "../Views/BasicComponentView";
import { ILabelView } from "../Views/Types";
import { BasicComponent } from "./BasicComponent";

export class LabelComponent extends BasicComponent {
    private _data: any;

    constructor(protected readonly view: BasicComponentView & ILabelView) {
        super(view);
    }

    get data() { return this._data; }

    set data(data: any) { this._data = data; }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    setFor(componentOrViewID: BasicComponent | string) {
        const viewID = typeof componentOrViewID === "string" ?
            componentOrViewID :
            componentOrViewID.getViewID();
        this.view.setFor(viewID);
    }
}