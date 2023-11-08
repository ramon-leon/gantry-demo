export const isDefined = ( str: string) => {
    if (!str || str === undefined || str === "")
        return false;
    return true;
}
