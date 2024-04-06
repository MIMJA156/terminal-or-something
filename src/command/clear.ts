export default {
    command: async function (_args: string[]): Promise<number> {
        postMessage({
            type: "stdout_set",
            data: []
        });
        return 0
    }
}