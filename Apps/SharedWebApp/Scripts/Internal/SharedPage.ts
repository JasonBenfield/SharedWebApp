import { BasicPage } from "../Lib/Components/BasicPage";
import { AppApiFactory } from "../Lib/Api/AppApiFactory";
import { SharedAppApi } from "./SharedAppApi";
import { SharedPageView } from "./SharedPageView";

export class SharedPage extends BasicPage {
    protected readonly defaultApi: SharedAppApi;

    constructor(view: SharedPageView) {
        super(new AppApiFactory(view.modalError).api(SharedAppApi), view);
    }

}