
export class AppVersionDomain {
    private webAppDomains = pageContext.WebAppDomains;

    static readonly instance = new AppVersionDomain();

    private constructor() {
    }

    value(app: string) {
        const domain = this.webAppDomains
            .filter(d => d.App.replace(' ', '').toLowerCase() === app.toLowerCase())[0];
        return domain || { App: '', Version: '', Domain: '' };
    }

    addDomain(domain: IAppVersionDomain) {
        this.webAppDomains.push(domain);
    }
}