import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";

export interface ICommandItem {
    readonly executeRequested: IEventHandler<any>;
    readonly icon: FaIcon;
    positionIconRight();
    setText(text: string);
    setTitle(text: string);
    setContext(contextualClass: ContextualClass);
    setActive();
    setInactive();
    show();
    hide();
    enable();
    disable();
}
