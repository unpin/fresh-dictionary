export function vibrate(pattern: number | number[]): boolean {
    if (typeof navigator.vibrate === "function") {
        return navigator.vibrate(pattern);
    }
    return false;
}
