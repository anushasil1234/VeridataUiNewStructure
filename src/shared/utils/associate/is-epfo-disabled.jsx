const { fileVerificationEnums } = require("shared/constants/constants");

const isEPFOSelectionDisabled = ({verificationFieldName, verificationFieldSet}) => {
    let isDisabled = true;
    if (verificationFieldName === fileVerificationEnums.docEPFO &&
        verificationFieldSet[fileVerificationEnums.docFname] === true
    ) {
        isDisabled = false;
    }
    return isDisabled;
}
export default isEPFOSelectionDisabled