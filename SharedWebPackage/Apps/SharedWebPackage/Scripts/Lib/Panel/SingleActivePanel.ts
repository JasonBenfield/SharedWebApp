export class SingleActivePanel {
    private readonly panels: IPanel[] = [];
    private _previousActive: IPanel = null;
    private _currentActive: IPanel = null;

    add<T extends IPanel>(panel: T) {
        this.panels.push(panel);
        return panel;
    }

    get previousActive() { return this._previousActive; }

    get currentActive() { return this._currentActive; }

    activate(panel: IPanel) {
        this._previousActive = this._currentActive;
        for (const p of this.panels) {
            p.deactivate();
        }
        panel.activate();
        this._currentActive = panel;
    }
}