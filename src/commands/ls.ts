import { currentWorkingDirectory } from "../globals";
import fileSystem from "../fileSystem.json"
import { tPrintln } from "../utils";

export function INFORMATION_ls(): string {
    return `
    ls - lists all items in a directory
    `
}

export async function COMMAND_ls(_args: string[]): Promise<number> {
    let cwd = currentWorkingDirectory.getValue();
    let nameArray = cwd.split("/").filter((item) => item !== "");
    nameArray.splice(0, 0, "");

    function internal(path: string[], depth: number, layer: any): string[] {
        let item = layer[path[depth]] as any | undefined;

        if (item !== undefined) {
            if (depth >= path.length - 1) {
                let keys = Object.keys(item);
                let newKeys = keys.filter((value) => !value.startsWith(">"));

                return newKeys;
            }

            if (item[">type"] === "dir") {
                return internal(path, depth + 1, item);
            }
        }

        return []
    }

    let contents = internal(nameArray, 0, fileSystem);
    let formattedOutput = "";

    contents.forEach((item, index) => {
        formattedOutput += `${item}${index < contents.length - 1 ? "\n" : ""}`
    });

    tPrintln(formattedOutput);

    return 0;
}