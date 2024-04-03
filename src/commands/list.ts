import { commandOutput, currentWorkingDirectory } from "../globals";
import fileSystem from "../fileSystem.json"

export default function COMMAND_list(_args: string[]): number {
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

    contents.forEach((item) => {
        formattedOutput += `${item}\n`
    });

    commandOutput.setValue(formattedOutput);

    return 0;
}