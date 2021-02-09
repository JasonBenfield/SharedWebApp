import * as ko from 'knockout';
import { Url } from './Url';
import { UrlBuilder } from './UrlBuilder';

export class ComponentTemplateAsync implements IComponentTemplate {
    constructor(readonly name: string, url: Url | UrlBuilder | string) {
        if (url instanceof Url) {
            this.url = url.value();
        }
        else if (url instanceof UrlBuilder) {
            this.url = url.value();
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