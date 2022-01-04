import { AppApi } from '../Api/AppApi';
import { PageFrameView } from '../PageFrameView';
export declare class UserPage {
    private readonly view;
    private readonly api;
    private readonly alert;
    constructor(page: PageFrameView, api: AppApi);
    private goToReturnUrl;
}
