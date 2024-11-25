import { epfoPassbookFileTypeAlias, epfoServiceHistoryFileTypeAlias, handicapFileTypeAlias, otherFileTypeAlias, passportFileTypeAlias, tenthCertificateFileTypeAlias, trustEpfoFileTypeAlias } from "shared/constants/constants";

const getFilenames = ({ fileUploaded }) => {

    let tenthCertificateFileName = [];
    let otherFileName = [];
    let passportFileName = [];
    let handicapFileName = [];
    let trustEpfoFileName = [];
    let epfoPassBookFiles = [];
    let epfoServiceHistoryFile = [];
    fileUploaded && fileUploaded.length > 0 && fileUploaded.forEach(
        ({ uploadTypeAlias, mimeType, fileData, fileName }) => {
            const fileDetails = `data:${mimeType};base64,${fileData}`;
            const file = {
                fileDetails,
                fileName,
            };

            if (uploadTypeAlias === tenthCertificateFileTypeAlias) {
                tenthCertificateFileName = [file.fileName];
            }
            if (uploadTypeAlias === otherFileTypeAlias) {
                otherFileName = [file.fileName];
            }

            if (uploadTypeAlias === passportFileTypeAlias) {
                passportFileName = [file.fileName];
            }
            if (uploadTypeAlias === handicapFileTypeAlias) {
                handicapFileName = [file.fileName];
            }
            if (uploadTypeAlias === trustEpfoFileTypeAlias) {
                
                trustEpfoFileName = [...trustEpfoFileName, file.fileName];
            }
            if (uploadTypeAlias === epfoPassbookFileTypeAlias) {
                epfoPassBookFiles = [...epfoPassBookFiles, file.fileName];
            }
            if (uploadTypeAlias === epfoServiceHistoryFileTypeAlias) {
                epfoServiceHistoryFile = [file.fileName];
            }
        }
    );
    return (
        {
            tenthCertificateFileName, otherFileName, passportFileName, handicapFileName,
            trustEpfoFileName, epfoPassBookFiles, epfoServiceHistoryFile
        }
    )
}

export default getFilenames