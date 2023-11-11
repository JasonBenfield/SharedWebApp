import { UserMenuDefinition } from "./UserMenuDefinition";

export class DefaultMenuDefinitions {
    static readonly instance = new DefaultMenuDefinitions();

    private constructor() { }

    readonly User = new UserMenuDefinition();
}