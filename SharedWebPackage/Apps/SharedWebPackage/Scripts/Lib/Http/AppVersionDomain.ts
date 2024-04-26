
export class AppVersionDomain {
    private webAppDomains: IAppVersionDomain[];

    static readonly instance = new AppVersionDomain();

    private constructor() {
    }

    value(app: string) {
        if (!this.webAppDomains) {
            this.webAppDomains = pageContext.WebAppDomains;
        }
        const domain = this.webAppDomains
            .filter(d => d.App.replace(' ', '').toLowerCase() === app.toLowerCase())[0];
        return domain || { App: '', Version: '', Domain: '' };
    }

    addDomain(domain: IAppVersionDomain) {
        if (!this.webAppDomains) {
            this.webAppDomains = pageContext.WebAppDomains;
        }
        this.webAppDomains.push(domain);
    }
}