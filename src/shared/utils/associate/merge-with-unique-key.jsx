const MergeWithUniqueKey = ({ smallerArray, wholeArrayList, uniqueKey }) => {
  const uniqueKeySet = new Set(smallerArray.map((item) => item[uniqueKey]));
  const filteredArray2 = wholeArrayList.filter((item) => {
    return !uniqueKeySet.has(item[uniqueKey]);
  });
  return [...smallerArray, ...filteredArray2];
};
export default MergeWithUniqueKey;
