import { BasicContainerView } from "./BasicContainerView";

export class RootView extends BasicContainerView {
    private static defaultElement() {
        const root = document.body.appendChild(document.createElement('div'));
        root.style.display = 'contents';
        return root;
    }

    constructor(el?: HTMLElement) {
        super(null, el || RootView.defaultElement());
    }
}