export const hasValue = (element) => {

    if (element === "" || element === null || element === undefined || /^\s*$/.test(element)) {
        return false;
    } else {
        return true;
    }
}