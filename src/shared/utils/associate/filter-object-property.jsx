export const filteredObjectProperty = (arrayObject, searchItem) => {
  const array =
    arrayObject && arrayObject.filter((object) => object.name||object.code === searchItem, searchItem);
  return array && (array[0]?.name || array[0]?.value);
};
