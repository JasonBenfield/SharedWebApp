﻿import { PageLoader } from '../Shared/PageLoader';
import { AppApiEvents } from '../Shared/AppApiEvents';
import { ConsoleLog } from '../Shared/ConsoleLog';
import { ModalErrorComponent } from '../Shared/Error/ModalErrorComponent';
import { container } from 'tsyringe';
import { LogoutUrl } from './LogoutUrl';
import { PageFrameViewModel } from '../Shared/PageFrameViewModel';
import { Dropdown } from 'bootstrap';
import _ = require('lodash');
import $ = require('jquery');

export function startup(pageVM: any, page: any) {
    container.register('PageVM', { useFactory: c => c.resolve(pageVM) });
    container.register('Page', { useFactory: c => c.resolve(page) });
    container.register(
        AppApiEvents,
        {
            useFactory: c => new AppApiEvents((err) => {
                new ConsoleLog().error(err.toString());
                c.resolve(ModalErrorComponent).show(err.getErrors(), err.getCaption());
            })
        }
    );
    container.register(
        'LogoutUrl',
        {
            useToken: LogoutUrl
        }
    );
    new PageLoader().load();
    let pageFrameVM = container.resolve(PageFrameViewModel);
    pageFrameVM.appTitle('App');
    pageFrameVM.pageTitle('Page');
    pageFrameVM.userName('Jason.Benfield');
    pageFrameVM.isAuthenticated(true);
    //_.delay(() => {
    //    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    //    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    //        let dropdown = new Dropdown(dropdownToggleEl);
    //        $(dropdownToggleEl).data('bs.dropdown', dropdown);
    //        return dropdown;
    //    })
    //}, 1000);
}