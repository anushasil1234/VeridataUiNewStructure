import React from 'react'
import { uploadAliasCategory } from 'shared/constants/constants';

const createFileUploadedData = ({ fileUploaded, verificationFieldModal = null }) => {
    console.log('fileUploaded', fileUploaded);
//   const test =  fileUploaded.filter(({ uploadTypeAlias }) => {
//         console.log('verificationFieldModal2342', verificationFieldModal, uploadTypeAlias, uploadAliasCategory[uploadTypeAlias]?.categoryType);
//         const _currentCategoryType = uploadAliasCategory[uploadTypeAlias]?.categoryType;
//         return (
//             _currentCategoryType &&  verificationFieldModal[_currentCategoryType] !== true
//         )
//     })
    // console.log('test23423', test);
    
    const upDatedFileUploaded = verificationFieldModal ? fileUploaded.filter(({ uploadTypeAlias }) => {
       
        
        const _currentCategoryType = uploadAliasCategory[uploadTypeAlias]?.categoryType;
        return (
            _currentCategoryType &&  verificationFieldModal[_currentCategoryType] !== true
        )
    })
        .map(({ uploadDetailsId, fileName, mimeType, uploadTypeId, uploadTypeAlias }) => {
            return ({
                uploadDetailsId,
                fileName,
                mimeType,
                uploadTypeId,
                uploadTypeAlias,
                fileLength: 0,
                isFileUploaded: false
            })
        }) :
        fileUploaded.map(({ uploadDetailsId, fileName, mimeType, uploadTypeId, uploadTypeAlias }) => {
            return ({
                uploadDetailsId,
                fileName,
                mimeType,
                uploadTypeId,
                uploadTypeAlias,
                fileLength: 0,
                isFileUploaded: false
            })
        })
  

    return ({ upDatedFileUploaded })
}

export default createFileUploadedData