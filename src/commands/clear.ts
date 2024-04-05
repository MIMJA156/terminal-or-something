import { outputBuffer, outputContainer } from "../globals";

export function INFORMATION_clear(): string {
    return `
    clear - clears all lines from the terminal
    `
}

export async function COMMAND_clear(_args: string[]): Promise<number> {
    outputBuffer.setValue([]);
    outputContainer.setValue([]);
    return 0;
}