import { BlockViewModel } from './BlockViewModel';
import { HtmlContainerComponent } from './HtmlContainerComponent';
export declare class Block extends HtmlContainerComponent {
    protected readonly vm: BlockViewModel;
    constructor(vm?: BlockViewModel);
    height100(): void;
    flexFill(): void;
    positionRelative(): void;
    positionAbsoluteFill(): void;
    scrollable(): void;
    setRole(role: string): void;
}
