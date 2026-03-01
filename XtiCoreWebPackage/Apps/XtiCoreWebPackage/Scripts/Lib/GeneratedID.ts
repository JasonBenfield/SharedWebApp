
export class GeneratedID {
    private static id = 1;

    static next(prefix: string = "") {
        const id = `${prefix || "component"}${GeneratedID.id}`;
        GeneratedID.id++;
        return id;
    }
}