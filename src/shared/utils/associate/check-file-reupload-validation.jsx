import { epfoPassbookFileTypeAlias, epfoServiceHistoryFileTypeAlias, fileVerificationEnums, otherFileTypeAlias, tenthCertificateFileTypeAlias, uploadAliasCategory } from "shared/constants/constants";

const checkFileReuploadValidation = ({ uploadedFile, verificationFieldModal }) => {
    let error = '';
    let epfoError = true;
    let fdocError = true;

    for (let index = uploadedFile.length - 1; index >= 0; index--) {
        const { uploadDetailsId, uploadTypeAlias } = uploadedFile[index];
        if (verificationFieldModal.isUanVarified === false && uploadDetailsId === 0 && epfoError === true &&
            (uploadTypeAlias === epfoPassbookFileTypeAlias || uploadTypeAlias === epfoServiceHistoryFileTypeAlias)) {
            epfoError = false;
        }
        if (verificationFieldModal.isFnameVarified === false && uploadDetailsId === 0 && fdocError === true &&
            (uploadTypeAlias === tenthCertificateFileTypeAlias || uploadTypeAlias === otherFileTypeAlias)) {
            fdocError = false;
        }
        if (epfoError === false && fdocError === false) {
            break;
        }
    }

    if (epfoError && verificationFieldModal.isUanVarified === false) {
        error = `Please attach a valid EPFO related document`;
    }
    if (fdocError && verificationFieldModal.isFnameVarified === false) {
        error = `Please attach a valid document with Father's name`
    }
    return (
        { error }
    )
}

export default checkFileReuploadValidation