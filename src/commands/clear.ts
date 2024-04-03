export default function COMMAND_clear(_args: string[]): number {
    let historyContainer = document.getElementById("history");
    if (historyContainer === null) return 1;

    historyContainer.innerHTML = "";
    return 0;
}