import { getCharPosition } from "./get-char-pos";

export const trimeFileName = (fileName) => {
    const secondOccurenceOfUnderScore = getCharPosition(fileName, '_', 2);
    const fistOccurenceOfDot = getCharPosition(fileName, '.', 1);
    const removeString = fileName  && fileName.slice(secondOccurenceOfUnderScore, fistOccurenceOfDot - 1)
    return fileName && fileName.split(removeString).join("");
}