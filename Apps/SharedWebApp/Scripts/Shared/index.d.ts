
declare module '*.scss' {
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

interface IHtmlStyle {
    width?: string;
    height?: string;
}

interface IGridStyle extends IHtmlStyle {
    'grid-template-columns'?: string;
    'grid-template-rows'?: string;
    'grid-auto-columns'?: string;
    'grid-auto-rows'?: string;
    'column-gap'?: string;
    'row-gap'?: string;
}

interface IHtmlAttributes {
    id?: string;
    name?: string;
    title?: string;
    'class'?: string;
    role?: string;
}

interface ITableDataAttributes extends IHtmlAttributes {
    colspan?: string;
    rowspan?: string;
    headers?: string;
}

interface ILinkAttributes extends IHtmlAttributes {
    href?: string;
}

interface ILabelAttributes extends IHtmlAttributes {
    for?: string;
}

interface IInputAttributes extends IHtmlAttributes {
    type?: string;
    maxlength?: string;
    autocomplete?: string;
}

interface IButtonAttributes extends IHtmlAttributes {
    type?: string;
}

interface IFormAttributes extends IHtmlAttributes {
    autocomplete?: string;
    action?: string;
    method?: string;
}

interface IXtiEventBindingOptions {
    [name: string]: IXtiEventOptions;
}

interface IXtiEventOptionsBuilder {

    select(selector: string): this;

    preventDefault(): this;
}

declare type IXtiEventCallback = (context?, evt?) => any;

interface IXtiEventOptions {
    callback: IXtiEventCallback;
    selector: string;
    preventDefault: boolean;
}

interface ICssClass {
    toString(): string;
}

interface ICssBuilder {
    cssClass(): ICssClass;
}

interface IEmptyRequest {
}

interface ILogoutRequest {
    ReturnUrl: string;
}

interface PageContext {
    WebAppDomains: IAppVersionDomain[];
    CacheBust: string;
    EnvironmentName: string;
    AppTitle: string;
    PageTitle: string;
    IsAuthenticated: boolean;
    UserName: string;
}

interface IAppVersionDomain {
    App: string;
    Version: string;
    Domain: string;
}

declare let pageContext: PageContext;

interface ITextComponentView {
    setText(text: string);
    setTitle(title: string);
}

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

interface IUserGroup {
    readonly Index: IAppApiView<IUserStartRequest>;
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

interface IComponentViewModel {
    view: any;
    readonly componentName: ko.Observable<string>;
}

interface IComponentTemplate {
    readonly name: string;
    register();
}

interface IHtmlComponentViewModel extends IComponentViewModel {
    readonly attr: ko.Observable<IHtmlAttributes>;
    readonly style: ko.Observable<IHtmlStyle>;
    readonly isVisible: ko.Observable<boolean>;
}

interface IHtmlContainerComponentViewModel extends IHtmlComponentViewModel {
    readonly content: IAggregateComponentViewModel;
}

interface IAggregateComponent {
    setName(name: string);
    addContent<TItem extends IComponent>(item: TItem): TItem;
    insertContent<TItem extends IComponent>(index: number, item: TItem): TItem;
    addItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(
        itemVM: TItemVM,
        item: TItem
    ): TItem;
    insertItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(
        index: number,
        itemVM: TItemVM,
        item: TItem
    ): TItem;
    removeItem<TItem extends IComponent>(item: TItem);
    show();
    hide();
}

interface IAggregateComponentViewModel extends IComponentViewModel {
    readonly name: ko.Observable<string>;
    readonly items: ko.ObservableArray<IComponentViewModel>;
    readonly isVisible: ko.Observable<boolean>;
}

interface IViewEvents {
    clear();
    onClick(
        callback: (source: IViewEventSource) => any,
        config?: (builder: IXtiEventOptionsBuilder) => void
    );
    onFocus(
        callback: (source: IViewEventSource) => any,
        config?: (builder: IXtiEventOptionsBuilder) => void
    );
    onBlur(
        callback: (source: IViewEventSource) => any,
        config?: (builder: IXtiEventOptionsBuilder) => void
    );
    onSubmit(
        callback: (source: IViewEventSource) => any,
        config?: (builder: IXtiEventOptionsBuilder) => void
    );
    on(
        name: string,
        callback: (source: IViewEventSource) => any,
        config?: (builder: IXtiEventOptionsBuilder) => void
    );
}

interface IListView {
    removeFromListItem(itemVM: IListItemViewModel, item: IListItemView);
    addFromListItem(itemVM: IListItemViewModel, item: IListItemView);
}

interface IListViewModel extends IHtmlComponentViewModel {
    readonly xtiEvent: ko.Observable<IXtiEventBindingOptions>;
    readonly items: ko.ObservableArray<IListItemViewModel>;
    readonly hasItems: ko.Observable<boolean>;
}

interface IListItemViewModel extends IHtmlComponentViewModel {
    readonly content: IAggregateComponentViewModel;
    readonly isClickable: boolean;
}

interface IListItemView {
    readonly content: IAggregateComponent;

    addCssName(name: string);

    addContent<TItem extends IComponent>(item: TItem): TItem;

    addToList(list: IListView): this;

    removeFromList(list: IListView): this;

    show();

    hide();
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

interface IColumn {
    setColumnCss(columnCss: IColumnCss);
    setTextCss(textCss: ITextCss);
}

interface IComponent {
    addToContainer(container: IAggregateComponent): this;
    insertIntoContainer(container: IAggregateComponent, index: number): this;
    removeFromContainer(container: IAggregateComponent): this;
}

declare type constructor<T> = {
    new(...args: any[]): T;
};