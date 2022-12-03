import { BasicPage } from './BasicPage';
import { TextComponent } from './TextComponent';
import { ErrorPageView } from '../Views/ErrorPageView';

declare let serverError: IErrorModel;

export class ErrorPage extends BasicPage {
    protected readonly view: ErrorPageView;

    constructor() {
        super(null, new ErrorPageView());
        new TextComponent(this.view.caption).setText(serverError.Caption);
        new TextComponent(this.view.message).setText(serverError.Message);
    }
}