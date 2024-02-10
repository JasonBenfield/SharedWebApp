
export class ComponentID {
    private static id: number = 0;

    static nextID(name: string = '') {
        const nextID = ComponentID.id + 1;
        ComponentID.id = nextID;
        return name ? `c${nextID}_${name}` : `c${nextID}`;
    }
}