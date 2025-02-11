import { epfoPassbookFileTypeAlias, epfoServiceHistoryFileTypeAlias, fatherFileCategoryTypeAlias, fileVerificationEnums, otherFileTypeAlias, tenthCertificateFileTypeAlias } from "shared/constants/constants";

export const validationsCheck = (arrvalue, validation_type) => {

    switch (validation_type) {
        case 'email':
            // return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(arrvalue);
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(arrvalue);

        // case 'userCode':
        //     return /^[a-zA-Z]+$/.test(arrvalue);

        case 'password':
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(arrvalue);

        case 'phnNumber':
            return /^[0-9]{10}$/.test(arrvalue);

        case 'indPassport':
            return /^[a-zA-Z0-9]{20}$/.test(arrvalue);
        case 'indPassportFile':
            return /^[a-zA-Z0-9]{12,20}$/.test(arrvalue);
        case 'AADHAR':
        case 'UAN':
            return /^\d{12}$/.test(arrvalue);

        case `${fileVerificationEnums.docComplete}_${epfoServiceHistoryFileTypeAlias}`:
        case `${fileVerificationEnums.docValid}_${epfoServiceHistoryFileTypeAlias}`:
        // case `${fileVerificationEnums.docComplete}_${epfoServiceHistoryFileTypeAlias}`:
        // case `${fileVerificationEnums.docValid}_${epfoServiceHistoryFileTypeAlias}`:
        case `${fileVerificationEnums.docComplete}_${epfoPassbookFileTypeAlias}`:
        case `${fileVerificationEnums.docValid}_${epfoPassbookFileTypeAlias}`:
        case `${fileVerificationEnums.docFname}_${fatherFileCategoryTypeAlias}`:
        case `${fileVerificationEnums.docComplete}_${fatherFileCategoryTypeAlias}`:
        case `${fileVerificationEnums.docValid}_${fatherFileCategoryTypeAlias}`:
        case `${fileVerificationEnums.pensionApplicable}_${epfoPassbookFileTypeAlias}`:
        case `${fileVerificationEnums.pensionGapFound}_${epfoPassbookFileTypeAlias}`:
        case fileVerificationEnums.pensionGapFound:
        case fileVerificationEnums.pensionApplicable:
        case fileVerificationEnums.pensionGapFound:
            return arrvalue !== undefined;
        default:
            return true;
    }
};