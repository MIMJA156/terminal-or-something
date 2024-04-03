export function charBufferToString(charBuffer: string[]) {
    let string = "";

    charBuffer.forEach((char) => {
        if (char !== undefined) string += char;
    });

    return string;
}

export function stringToCharBuffer(str: string) {
    let charBuffer: string[] = [];

    str.split("").forEach((char) => {
        charBuffer.push(char);
    });

    return charBuffer;
}

export class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}