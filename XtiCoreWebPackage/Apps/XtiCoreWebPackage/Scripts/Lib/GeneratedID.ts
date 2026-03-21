
export class GeneratedID {
    private static id = 1;

    static next(prefix: string = "") {
        if (!prefix) {
            prefix = "component";
        }
        const idText = GeneratedID.id.toString().padStart(7, "0");
        const id = `${prefix}${idText}`;
        GeneratedID.id++;
        return id;
    }
}