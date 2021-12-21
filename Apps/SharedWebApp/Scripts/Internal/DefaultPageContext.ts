
export class DefaultPageContext {
    load() {
        pageContext.AppTitle = 'App';
        pageContext.PageTitle = 'Page';
        pageContext.UserName = 'Jason.Benfield';
        pageContext.IsAuthenticated = true;
    }
}