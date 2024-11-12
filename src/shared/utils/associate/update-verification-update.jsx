const updateVerificationUpdate = ({ verificationUpdate, verificationQuestionSet, updatedQuestionSet }) => {
    let _verificationUpdate = {};
    if ((verificationUpdate.isDocComplete === false || verificationUpdate.isDocValid === false) &&
        verificationQuestionSet.length > 2) {
        updatedQuestionSet.map(({ name, disabled }) => {
            if (disabled === false) {
                return _verificationUpdate = { ..._verificationUpdate, [name]: verificationUpdate[name] }
            }
        })
    } else {
        _verificationUpdate = verificationUpdate;
    }
    return (
        { updatedVerification: _verificationUpdate }
    )
}

export default updateVerificationUpdate