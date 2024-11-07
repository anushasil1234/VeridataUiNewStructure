export const hasValue = (element) => {

    if (element === "" || element === null || element === undefined || /^\s*$/.test(element)
        || element === 'NA' || (Array.isArray(element) && element.length === 0)) {
        return false;
    } else {
        return true;
    }
}