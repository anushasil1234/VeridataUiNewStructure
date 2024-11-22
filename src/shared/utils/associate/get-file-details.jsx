import { duplicateFiles, imgAndPdfMaxSizeValue, uploadSizeErrorMsg } from "shared/constants/constants";
import { removeFile } from "..";

const getFileDetails = ({ files, uploadTypeAlias, setFileName, _filenameList,
    uploadType, uploadedFile, fileDetails, fileTypeList }) => {
    console.log('fileTypeList', fileTypeList, uploadTypeAlias);
    console.log('_filenameList', _filenameList);

    let fileNameList = [..._filenameList];
    let updatedUploadedFileList = [...uploadedFile];
    let updatedFileDetails = [...fileDetails];
    let error;
    console.log('files234234', files);

    for (let index = 0; index < files.length; index++) {
        const { name, size, type } = files[index];
        let isFileExists = false;
        let isFileOfSameTypeExists = false;
        console.log('isFileExists');
        for (let index = 0; index < uploadedFile.length; index++) {

            const { fileLength, fileName, mimeType, uploadTypeAlias: _uploadTypeAlias } = uploadedFile[index];
            if (name === fileName && size === fileLength && mimeType === type) {
                isFileExists = true;
                if (_uploadTypeAlias === uploadTypeAlias) {
                    isFileOfSameTypeExists = true;
                }
            }
        }
        console.log('isFileExists');
        if (isFileExists) {

            error = `${name} ${duplicateFiles}`;
            if (isFileOfSameTypeExists && uploadType === 'single') {
                fileNameList = [name];
            }
        }
        else {
            console.log('sfsadasfsdf');

            if (size <= imgAndPdfMaxSizeValue) {
                // Find the file type ID based on the uploadTypeAlias
                console.log('fileTypeList123', fileTypeList, uploadTypeAlias);

                const { id } =
                    fileTypeList &&
                    fileTypeList.length > 0 &&
                    fileTypeList.find(({ code }) => code === uploadTypeAlias);
                // Create new file object
                const file = {
                    uploadDetailsId: 0,
                    fileName: name,
                    mimeType: type,
                    fileLength: size,
                    uploadTypeId: id,
                    uploadTypeAlias: uploadTypeAlias,
                    isFileUploaded: true,
                };

                if (uploadType === 'single') {
                    const { updatedUploadedFileList: _updatedUploadedFileList, updatedFileDetails: _updatedFileDetails } = removeFile({
                        uploadedFile: updatedUploadedFileList,
                        fileDetails: updatedFileDetails,
                        uploadTypeAlias: uploadTypeAlias,
                        fileNameList: fileNameList,
                        uploadType: uploadType
                    });
                    fileNameList = [name];
                    updatedUploadedFileList = [..._updatedUploadedFileList, file];
                    updatedFileDetails = [..._updatedFileDetails, files[index]];
                } else {
                    fileNameList = [...fileNameList, name];
                    updatedUploadedFileList = [...updatedUploadedFileList, file];
                    updatedFileDetails = [...updatedFileDetails, files[index]];
                    console.log('updatedUploadedFileList', updatedUploadedFileList, fileNameList);
                }

            } else {
                error = uploadSizeErrorMsg;
            }
        }
    }
    console.log('fileNameList', fileNameList);

    return ({
        error: error,
        updatedUploadedFileList: updatedUploadedFileList,
        updatedFileDetails: updatedFileDetails,
        fileNameList: fileNameList
    })
};

export default getFileDetails