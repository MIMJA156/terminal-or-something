export class Box<T> {
    private value: T

    constructor(value: T) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setValue(value: T) {
        this.value = value;
    }
}

export const stdout: Box<string[]> = new Box([]);
export const stdin: Box<string[]> = new Box([]);