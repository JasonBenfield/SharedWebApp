﻿import * as ko from 'knockout';
import './Styles/default.scss';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.svg";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff";
import "@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.svg";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff";
import "@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff";
import "@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2";
import 'tslib';
import { SubmitBindingHandler } from './SubmitBindingHandler';
import { ModalBindingHandler } from './ModalBindingHandler';
import { UrlBuilder } from './UrlBuilder';
import { ConsoleLog } from './ConsoleLog';
import { DropdownBindingHandler } from './DropdownBindingHandler';
import { DelegatedEventBindingHandler } from './DelegatedEventBindingHandler';
import { PageViewModel } from './PageViewModel';

export class PageLoader {
    loadPage(pageVM: PageViewModel) {
        let defaultConfigLoader = {
            getConfig: (name: string, callback) => {
                if (name.indexOf('/') > -1) {
                    callback({
                        template: { templateUrl: name },
                        synchronous: true
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        let defaultComponentLoader = {
            loadComponent: (name: string, config, callback) => {
                let templateConfig = config.template;
                if (templateConfig.templateUrl) {
                    this.loadFromTemplateUrl(templateConfig.templateUrl, callback, templateConfig.errorMarkup);
                }
                else if (templateConfig.containerID) {
                    let container = document.getElementById(templateConfig.containerID);
                    callback({
                        template: container && container.childNodes,
                        createViewModel: this.createViewModel
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        ko.components.loaders.unshift(defaultConfigLoader);
        ko.components.loaders.unshift(defaultComponentLoader);
        ko.options.deferUpdates = true;
        ko.bindingHandlers.submit = new SubmitBindingHandler();
        ko.bindingHandlers.modal = new ModalBindingHandler();
        ko.bindingHandlers.dropdown = new DropdownBindingHandler();
        ko.bindingHandlers.delegatedEvent = new DelegatedEventBindingHandler();
        ko.applyBindings(pageVM);
    }

    private createViewModel(params, componentInf) {
        return params;
    }

    private loadFromTemplateUrl(templateUrl: string, callback: (config) => void, getErrorMarkup: (err: any) => string) {
        let urlBuilder = new UrlBuilder(templateUrl);
        if (!urlBuilder.hasQuery('cacheBust')) {
            urlBuilder.addQuery('cacheBust', pageContext.CacheBust);
        }
        let url = urlBuilder.value();
        function reqListener() {
            console.log(this.responseText);
        }
        let oReq = new XMLHttpRequest();
        oReq.withCredentials = true;
        oReq.onreadystatechange = () => {
            if (oReq.readyState == 4) {
                if (oReq.status === 200) {
                    let template = ko.utils.parseHtmlFragment(oReq.responseText);
                    callback({
                        template: template,
                        createViewModel: this.createViewModel
                    });
                }
                else {
                    new ConsoleLog().error(`Error loading ${url}\r\nStatus: ${oReq.status}\r\n${oReq.responseText}`);
                    callback({
                        template: '',
                        createViewModel: (params, componentInfo) => {
                            return params;
                        }
                    });
                    ko.components.clearCachedDefinition(templateUrl);
                }
            }
        };
        oReq.addEventListener("load", reqListener.bind(oReq));
        oReq.open('GET', url);
        oReq.setRequestHeader("cache-control", "private");
        oReq.send('');
    }
}