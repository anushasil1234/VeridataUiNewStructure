export const hasValue = (element) => {

    if (element === "" || element === null || element === undefined || /^\s*$/.test(element) || element === 'NA') {
        return false;
    } else {
        return true;
    }
}