import { BasicPage } from "../Lib/Components/BasicPage";
import { AppClientFactory } from "../Lib/Http/AppClientFactory";
import { SharedAppClient } from "./SharedAppClient";
import { SharedPageView } from "./SharedPageView";

export class SharedPage extends BasicPage {
    protected readonly sharedClient: SharedAppClient;

    constructor(view: SharedPageView) {
        const sharedClient = new AppClientFactory(view.modalError).create(SharedAppClient);
        super(sharedClient, view);
        this.sharedClient = sharedClient;
    }

}