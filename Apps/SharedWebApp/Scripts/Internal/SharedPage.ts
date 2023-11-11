import { BasicPage } from "../Lib/Components/BasicPage";
import { AppClientFactory } from "../Lib/Http/AppClientFactory";
import { SharedAppApi } from "./SharedAppApi";
import { SharedPageView } from "./SharedPageView";

export class SharedPage extends BasicPage {
    protected readonly defaultClient: SharedAppApi;

    constructor(view: SharedPageView) {
        super(new AppClientFactory(view.modalError).api(SharedAppApi), view);
    }

}