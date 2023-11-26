
export class ComponentID {
    private static id: number = 0;

    static nextID() {
        const nextID = ComponentID.id + 1;
        ComponentID.id = nextID;
        return `c${nextID}`;
    }
}