import { BaseStartup } from "../Shared/BaseStartup";

export class Startup extends BaseStartup {

    build() {
        pageContext.AppTitle = 'App';
        pageContext.PageTitle = 'Page';
        pageContext.UserName = 'Jason.Benfield';
        pageContext.IsAuthenticated = true;
        return super.build();
    }

    protected getDefaultApi() {
        return null;
    }
}