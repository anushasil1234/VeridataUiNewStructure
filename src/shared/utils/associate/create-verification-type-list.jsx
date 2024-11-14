const createVerificationTypeList = (verificationTypeList, verificationFieldSet) => {
    const _verificationTypeList = verificationTypeList.filter(({ verificationFieldName }) => {
        return verificationFieldSet[verificationFieldName] !== true
    });

    return ({ verificationTypeList: _verificationTypeList })
}

export default createVerificationTypeList