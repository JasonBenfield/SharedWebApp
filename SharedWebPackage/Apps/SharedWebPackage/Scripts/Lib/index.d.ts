﻿declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.html' {
    const content: string;
    export default content;
}

declare type LayoutBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

declare type FlexDirections = 'row' | 'column';

declare type FlexWraps = 'wrap' | 'nowrap' | 'wrap-reverse';

declare type ContentJustifications = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

interface IFormattable {
    format(): string;
}

interface ICssClass {
    toString(): string;
}

interface ICssBuilder {
    cssClass(): ICssClass;
}

interface IEmptyRequest {
}

interface IEmptyActionResult {
}

interface ILogoutRequest {
    ReturnUrl: string;
}

interface IResourcePath {
    Group: string;
    Action: string;
    ModKey: string;
}

interface IResourcePathAccess {
    Path: IResourcePath;
    HasAccess: boolean;
}

interface ILinkModel {
    LinkName: string;
    DisplayText: string;
    Url: string;
}

interface PageContext {
    WebAppDomains: IAppVersionDomain[];
    CacheBust: string;
    EnvironmentName: string;
    AppTitle: string;
    PageTitle: string;
    IsAuthenticated: boolean;
    UserName: string;
    RootUrl: string;
}

interface IAppVersionDomain {
    App: string;
    Version: string;
    Domain: string;
}

declare let pageContext: PageContext;

interface EventCallback<TArgs> {
    (args: TArgs, source?: any): void;
}

interface IArrayItemEvent<TArgs> {
    handlerAccessor: (item: any) => IEventHandler<TArgs>;
    callback: EventCallback<TArgs>;
    isEnabled?: () => boolean;
}

interface IEventHandler<TArgs> {
    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean): IEventHandler<TArgs>;
    unregister(identifier: any);
}

interface IEvent<TArgs> extends IEventHandler<TArgs> {
    invoke(args?: TArgs);
    dispose();
}

interface RegisteredEventCallback {
    callback: EventCallback<any>;
    identifier: string;
    isEnabled: () => boolean;
}

interface IViewEventSource {
    readonly view;
    readonly containerView;
}

interface IActionErrorOptions {
    caption?: string;
    preventDefault?: boolean;
}

interface IErrorModel {
    Message: string;
    Caption: string;
    Source: string;
}

interface IUserStartRequest {
    ReturnUrl: string;
}

interface IAppApiView<TArgs> {
    getUrl(data: TArgs);
    open(data: TArgs);
    openWindow(data: TArgs);
}

interface IErrorList {
    add(error: IErrorModel);
    merge(errors: IErrorList);
    hasErrors(): boolean;
    values(): IErrorModel[];
}

interface IField {
    getName(): string;
    getCaption(): string;
    getValue(): any;
    getField(name: string): IField;
    clearErrors();
    validate(errors: IErrorList);
    import(values: Record<string, any>);
    export(values: Record<string, any>);
}

interface IConstraintResult {
    readonly isValid: boolean;
    readonly errorMessage: string;
}

interface IConstraint {
    test(value: any): IConstraintResult;
}

type ColumnCssSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'fill';

interface IColumnCss {
    xs(columnSize: ColumnCssSize);
    sm(columnSize: ColumnCssSize);
    md(columnSize: ColumnCssSize);
    lg(columnSize: ColumnCssSize);
    xl(columnSize: ColumnCssSize);
    xxl(columnSize: ColumnCssSize);
}

interface ITextCss {
}

declare type constructor<T> = {
    new(...args: any[]): T;
};

interface INumericValue {
    Value: number;
    DisplayText: string;
}
