export declare class SingleActivePanel {
    private readonly panels;
    private _previousActive;
    private _currentActive;
    add<T extends IPanel>(panel: T): T;
    get previousActive(): IPanel;
    get currentActive(): IPanel;
    activate(panel: IPanel): void;
}
