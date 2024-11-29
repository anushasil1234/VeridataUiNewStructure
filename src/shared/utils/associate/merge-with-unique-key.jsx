const MergeWithUniqueKey = ({ smallerArray, wholeArrayList, uniqueKey }) => {
    const uniqueKeySet = new Set(smallerArray.map(item => item[uniqueKey]));
  

    // Filter the second array to include only items with different uploadTypeAlias
    const filteredArray2 = wholeArrayList.filter(item => { console.log('item[uniqueKeySet] ', item[uniqueKey], item)
     return !uniqueKeySet.has(item[uniqueKey])});
    

    // Merge the first array with the filtered second array
    return [...smallerArray, ...filteredArray2];
}

export default MergeWithUniqueKey