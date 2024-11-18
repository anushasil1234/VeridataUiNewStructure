const getFileCategoryByFileType = (verificationCategoryList, fileTypeCategory) => {
    console.log("verificationCategoryList", verificationCategoryList);

    const subCategory = verificationCategoryList && verificationCategoryList.length > 0 &&
        verificationCategoryList.filter(({ value }) => value === fileTypeCategory)[0]?.subCategory
    return { subCategory }; // Return null if fileType is not found
}
export default getFileCategoryByFileType