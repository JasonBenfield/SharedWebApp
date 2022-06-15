import { ButtonViewModel } from "./ButtonViewModel";
import { ContextualClass } from "../ContextualClass";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { ViewEvents } from "./ViewEvents";

export class Button extends HtmlContainerComponent {
    protected readonly vm: ButtonViewModel;
    private context: ContextualClass;
    private isOutline = false;

    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        this.setAttr(attr => attr.type = 'button');
        this.addCssName('btn');
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    protected setAttr: (config: (attr: IButtonAttributes) => void) => void;

    changeTypeToSubmit() {
        this.setAttr(attr => attr.type = 'submit');
    }

    enable() { this.vm.isEnabled(true); }

    disable() { this.vm.isEnabled(false); }

    setContext(context: ContextualClass) {
        let contextCss = this.getContextCss(context, this.isOutline);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.context = context;
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    useOutlineStyle() {
        let contextCss = this.getContextCss(this.context, true);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.isOutline = true;
    }
}