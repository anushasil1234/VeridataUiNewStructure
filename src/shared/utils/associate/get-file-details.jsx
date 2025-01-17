import { duplicateFiles, imgAndPdfMaxSizeValue, uploadSizeErrorMsg } from "shared/constants/constants";
import { removeFile } from "..";

const getFileDetails = ({ files, uploadTypeAlias, setFileName, _filenameList,
    uploadType, uploadedFile, fileDetails, fileTypeList }) => {
        // console.log('uploadType12321', uploadType, uploadTypeAlias, uploadedFile, fileTypeList);

    let fileNameList = [..._filenameList];
    let updatedUploadedFileList = [...uploadedFile];
  
    
    let updatedFileDetails = [...fileDetails];
    let error;

    for (let index = 0; index < files.length; index++) {
        const { name, size, type } = files[index];
        let isFileExists = false;
        let isFileOfSameTypeExists = false;
        for (let index = 0; index < uploadedFile.length; index++) {

            const { fileLength, fileName, mimeType, uploadTypeAlias: _uploadTypeAlias, uploadDetailsId } = uploadedFile[index];
        
            
            if (name === fileName && size === fileLength && mimeType === type && uploadDetailsId === 0) {
                isFileExists = true;
                if (_uploadTypeAlias === uploadTypeAlias) {
                    isFileOfSameTypeExists = true;
                }
            }
            if (name === fileName && mimeType === type && uploadDetailsId > 0) {
                isFileExists = true;
                if (_uploadTypeAlias === uploadTypeAlias) {
                    isFileOfSameTypeExists = true;
                }
            }
        }
        if (isFileExists) {

            error = `${name} ${duplicateFiles}`;
            if (isFileOfSameTypeExists && uploadType === 'single') {
                fileNameList = [name];
            }
        }
        else {

            if (size <= imgAndPdfMaxSizeValue) {
                // Find the file type ID based on the uploadTypeAlias
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
                    // console.log("Uploading221321",
                    //     updatedFileDetails,
                    //     _updatedFileDetails,
                    //     );
                    fileNameList = [name];
                    updatedUploadedFileList = [..._updatedUploadedFileList, file];
                    updatedFileDetails = [..._updatedFileDetails, files[index]];
                } else {
                    
                    fileNameList = [...fileNameList, name];
                    updatedUploadedFileList = [...updatedUploadedFileList, file];
                    updatedFileDetails = [...updatedFileDetails, files[index]];
                }

            } else {
                error = uploadSizeErrorMsg;
            }
        }
    }
   
    
    return ({
        error: error,
        updatedUploadedFileList: updatedUploadedFileList,
        updatedFileDetails: updatedFileDetails,
        fileNameList: fileNameList
    })
};

export default getFileDetails