const MergeWithUniqueKey = ({ smallerArray, wholeArrayList, uniqueKey }) => {
    const uniqueKeySet = new Set(smallerArray.map(item => item[uniqueKey]));
    console.log('uniqueKeySet1231', uniqueKeySet);

    // Filter the second array to include only items with different uploadTypeAlias
    const filteredArray2 = wholeArrayList.filter(item => { console.log('item[uniqueKeySet] ', item[uniqueKey], item)
     return !uniqueKeySet.has(item[uniqueKey])});
    console.log('filteredArray2', filteredArray2, smallerArray);

    // Merge the first array with the filtered second array
    return [...smallerArray, ...filteredArray2];
}

export default MergeWithUniqueKey