import { FilteredArray, First } from "../Enumerable";

export class AppVersionDomain {
    value(app: string) {
        let domain = new First(
            new FilteredArray(
                pageContext.WebAppDomains,
                d => d.App.toLowerCase() === app.toLowerCase()
            )
        ).value();
        return domain || { App: '', Version: '', Domain: '' };
    }
}