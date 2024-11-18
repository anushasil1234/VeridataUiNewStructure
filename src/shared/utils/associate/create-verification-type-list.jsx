import { epfFileCategoryTypeAlias, fileVerificationEnums } from "shared/constants/constants";
import isEPFOSelectionDisabled from "./is-epfo-disabled";

const createVerificationTypeList = (verificationTypeList, verificationFieldSet) => {
    let _verificationTypeList = verificationTypeList.filter(({ verificationFieldName }) => {
        return verificationFieldSet[verificationFieldName] !== true
    });
    _verificationTypeList.map((_verificationTypeItem) => {
        const { verificationFieldName } = _verificationTypeItem;
        if (
            verificationFieldName === fileVerificationEnums.docEPFO
        ) {
            _verificationTypeItem.isDisabled = isEPFOSelectionDisabled({
                verificationFieldName, verificationFieldSet
            });
        }

        // else {
        //     if (verificationFieldName !== 'none') {
        //         _verificationTypeItem.isDisabled = true;
        //     }
        // }
        return _verificationTypeItem
    })
    console.log('_verificationTypeList', _verificationTypeList);

    return ({ verificationTypeList: _verificationTypeList })
}

export default createVerificationTypeList