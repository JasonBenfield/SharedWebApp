import { BasicPage } from "../Lib/Components/BasicPage";
import { AppClientFactory } from "../Lib/Http/AppClientFactory";
import { SharedAppClient } from "./SharedAppClient";
import { SharedPageView } from "./SharedPageView";

export class SharedPage extends BasicPage {
    protected readonly defaultClient: SharedAppClient;

    constructor(view: SharedPageView) {
        super(new AppClientFactory(view.modalError).create(SharedAppClient), view);
    }

}