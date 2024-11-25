import React from 'react'
import { uploadAliasCategory } from 'shared/constants/constants';

const createFileUploadedData = ({ fileUploaded, verificationFieldModal = null }) => {
    console.log('fileUploaded', fileUploaded);

    const upDatedFileUploaded = verificationFieldModal ? fileUploaded.filter(({ uploadTypeAlias }) => {
        return (
            verificationFieldModal[uploadAliasCategory[uploadTypeAlias]?.categoryType] !== true
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
    console.log('upDatedFileUpload', upDatedFileUploaded);

    return ({ upDatedFileUploaded })
}

export default createFileUploadedData