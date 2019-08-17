export class ObjectUtil {
    static assertNever(x: never): void {
        throw new Error('Unexpected object: ' + x);
    }
}
