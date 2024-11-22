import { epfoPassbookFileTypeAlias, epfoServiceHistoryFileTypeAlias, fatherFileCategoryTypeAlias } from "shared/constants/constants";

const filterDocVerificationList = (
    {
        uploadedFileData,
        fileCategory: currentFileCategory,
        verificationCategoryList,
        isRead = false,
        category: currentCategory,
        fileType: currentFileType
    }) => {
    let _verificationDropdownCategoryList = [];
    let verificationFilteredCategoryList = [];
    let _filteredFileInfo;
    if (currentFileCategory) {
        console.log("uploadedFileData", uploadedFileData, currentFileCategory
        );

        verificationFilteredCategoryList = uploadedFileData?.filter(({ fileCategory }) => fileCategory === currentFileCategory)[0]?.files;
        _verificationDropdownCategoryList = verificationFilteredCategoryList?.map(({ fileType }) => {
            let subCategory;
            if (fileType === '10th Certificate' || fileType === 'Other Govt.Proof') {
                subCategory = fatherFileCategoryTypeAlias;
            }
            if (fileType === 'EPFO Service History') {
                subCategory = epfoServiceHistoryFileTypeAlias;
            }
            if (fileType === 'PF Passbook(s)') {
                subCategory = epfoPassbookFileTypeAlias;
            }
            return ({
                label: fileType,
                value: fileType,
                isRead: isRead,
                subCategory: subCategory
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
                    label: fileName,
                    isRead: isRead
                })
            })
    }
    return { verificationCategoryList: _verificationDropdownCategoryList, files: _filteredFileInfo };
}

export default filterDocVerificationList