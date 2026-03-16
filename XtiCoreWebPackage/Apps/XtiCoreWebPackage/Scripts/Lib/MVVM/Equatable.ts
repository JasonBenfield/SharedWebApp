
export interface IEquatable {
    equals(other: any): boolean;
}

export function areValuesEqual(originalValue: any, value: any): boolean {
    let result: boolean;
    if (originalValue === value) {
        result = true;
    }
    else if (isEquatable(originalValue)) {
        result = originalValue.equals(value);
    }
    else {
        result = false;
    }
    return result;
}

export function isEquatable(object: any): object is IEquatable {
    return (
        typeof object === "object" &&
        object !== null &&
        "equals" in object &&
        typeof object.equals === "function"
    );
}

