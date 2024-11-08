const filterDocVerificationList = (
    {
        uploadedFileData,
        fileCategory: currentFileCategory,
        verificationCategoryList,
        category: currentCategory,
        fileType: currentFileType
    }) => {
    let _verificationDropdownCategoryList;
    let verificationFilteredCategoryList;
    let _filteredFileInfo;
    if (currentFileCategory) {
        console.log("uploadedFileData", uploadedFileData, currentFileCategory
        );

        verificationFilteredCategoryList = uploadedFileData?.filter(({ fileCategory }) => fileCategory === currentFileCategory)[0]?.files;
        _verificationDropdownCategoryList = verificationFilteredCategoryList?.map(({ fileType }) => {
            return ({
                label: fileType,
                value: fileType
            })
        })
    }
    if (currentFileType) {
        // _verificationCategoryList?.filter(({filesInfo})=>)
        _filteredFileInfo = verificationFilteredCategoryList?.filter(({ fileType }) => fileType === currentFileType)[0]
            ?.filesInfo
            ?.map(({ uploadDetailId, fileName }) => {
                return ({
                    value: uploadDetailId,
                    label: fileName
                })
            })
        console.log('_filteredFileInfo', _filteredFileInfo);

    }
    console.log("verificationCategoryList23424", verificationFilteredCategoryList, _filteredFileInfo);
    console.log("verificationCategoryList23424currentFileType", currentFileType);

    return { verificationCategoryList: _verificationDropdownCategoryList, files: _filteredFileInfo };
}

export default filterDocVerificationList