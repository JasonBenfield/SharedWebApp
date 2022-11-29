
export class DefaultPageContext {
    load() {
        pageContext.WebAppDomains = [
            { App: 'Shared', Version: 'Current', Domain: 'development.guinevere.com:44303' }
        ];
        pageContext.AppTitle = 'App';
        pageContext.PageTitle = 'Page';
        pageContext.UserName = 'Jason.Benfield';
        pageContext.IsAuthenticated = true;
        pageContext.EnvironmentName = 'Development';
    }
}