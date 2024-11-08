
const getUploadFiles = ({ files }, uploadTypeAlias, _filenameList, uploadType = 'single') => {
    // let isFileExists;
    // let fileNameList = _filenameList;
    // let updatedUploadedFileList = [...uploadedFile];
    // let updatedFileDetails = [...fileDetails];
    // let error;

    // for (let index = 0; index < files.length; index++) {
    //   const { name, size, type } = files[index];
    //   isFileExists = fileDetails.find((currentFileData) => {
    //     return (
    //       currentFileData.name === name &&
    //       currentFileData.size === size &&
    //       currentFileData.type === type
    //     );
    //   });

    //   if (isFileExists) {
    //     error = `${name} ${duplicateFiles}`;
    //     if (uploadType === 'single') {
    //       fileNameList = [name];
    //     }
    //   }
    //   else {

    //     if (size <= imgAndPdfMaxSizeValue) {

    //       // Find the file type ID based on the uploadTypeAlias
    //       const { id } =
    //         fileTypeList &&
    //         fileTypeList.length > 0 &&
    //         fileTypeList.find(({ code }) => code === uploadTypeAlias);
    //       // Create new file object
    //       const file = {
    //         fileName: name,
    //         mimeType: type,
    //         fileLength: size,
    //         uploadTypeId: id,
    //         uploadTypeAlias: uploadTypeAlias,
    //         isFileUploaded: true,
    //       };

    //       if (uploadType === 'single') {
    //         const { updatedUploadedFileList: _updatedUploadedFileList, updatedFileDetails: _updatedFileDetails } = removeFile({
    //           uploadedFile: updatedUploadedFileList,
    //           fileDetails: updatedFileDetails,
    //           uploadTypeAlias: uploadTypeAlias,
    //           fileNameList: fileNameList,
    //           uploadType: uploadType
    //         });
    //         fileNameList = [name];
    //         updatedUploadedFileList = [..._updatedUploadedFileList, file];
    //         updatedFileDetails = [..._updatedFileDetails, files[index]];
    //       } else {
    //         fileNameList = [...fileNameList, name];
    //         updatedUploadedFileList = [...updatedUploadedFileList, file];
    //         updatedFileDetails = [...updatedFileDetails, files[index]];
    //       }

    //     } else {
    //         error = uploadSizeErrorMsg;
    //     }
    //   }
    // }
    
}

export default getUploadFiles