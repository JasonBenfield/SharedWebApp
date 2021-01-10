import * as ko from 'knockout';
import { UrlBuilder } from './UrlBuilder';

export class ComponentTemplateAsync {
    constructor(private readonly name: string, url: UrlBuilder | string) {
        if (url instanceof UrlBuilder) {
            this.url = url.getUrl();
        }
        else {
            this.url = url;
        }
    }

    private readonly url: string;

    register() {
        if (!ko.components.isRegistered(this.name)) {
            ko.components.register(this.name, {
                template: {
                    templateUrl: this.url
                }
            });
        }
    }
}