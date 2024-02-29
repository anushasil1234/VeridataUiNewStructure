export const getCharPosition =(str, subStr, i)=> {
    return str && str.split(subStr, i).join(subStr).length;
}