import { fileVerificationEnums } from "shared/constants/constants";

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
            return /^[a-zA-Z0-9]{12}$/.test(arrvalue);
        case fileVerificationEnums.docComplete:
        case fileVerificationEnums.docValid:
        case fileVerificationEnums.docFname:
        case fileVerificationEnums.pensionApplicable:
        case fileVerificationEnums.pensionGapFound:
            return arrvalue !== undefined;
        default:
            return true;
    }
};