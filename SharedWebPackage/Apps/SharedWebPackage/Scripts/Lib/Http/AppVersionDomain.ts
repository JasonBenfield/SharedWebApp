
export class AppVersionDomain {
    value(app: string) {
        const domain = pageContext.WebAppDomains
            .filter(d => d.App.replace(' ', '').toLowerCase() === app.toLowerCase())[0];
        return domain || { App: '', Version: '', Domain: '' };
    }
}