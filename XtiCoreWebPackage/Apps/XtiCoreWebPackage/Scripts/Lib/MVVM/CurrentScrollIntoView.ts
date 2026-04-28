import { ComponentViewModel } from "./ComponentViewModel";

export class CurrentScrollIntoView {
    static readonly value = new CurrentScrollIntoView();

    private constructor() { }

    private currentScrollIntoView: ComponentViewModel | null = null;

    setCurrent(vm: ComponentViewModel) {
        const currentScrolledIntoView = this.currentScrollIntoView;
        if (currentScrolledIntoView && currentScrolledIntoView !== vm) {
            currentScrolledIntoView.isScrolledIntoView = false;
            this.currentScrollIntoView = null;
        }
        if (vm) {
            vm.isScrolledIntoView = true;
        }
        this.currentScrollIntoView = vm;
    }
}
