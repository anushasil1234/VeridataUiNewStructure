const updateVerificationUpdate = ({ verificationUpdate, verificationQuestionSet, updatedQuestionSet }) => {
    let _verificationUpdate = {};
    if ((verificationUpdate.isDocComplete === false || verificationUpdate.isDocValid === false) &&
        verificationQuestionSet.length > 2) {
        updatedQuestionSet.map(({ name, disabled }) => {
            if (disabled === false) {
                return _verificationUpdate = { ..._verificationUpdate, [name]: verificationUpdate[name] }
            }
        })
    }
     else {
        if (verificationUpdate.isDocComplete === true &&
             verificationUpdate.isDocValid === true && 
             verificationUpdate?.isPensionApplicable === false  
            ) {
                updatedQuestionSet.map(({ name }) => {
                    if (_verificationUpdate.isPensionApplicable === false && name === 'isPensionGapFound' ) {
                        return _verificationUpdate = { ..._verificationUpdate, [name]:false }
                        
                    }else {
                        return _verificationUpdate = { ..._verificationUpdate, [name]: verificationUpdate[name] }
                    }
                })
        }else {
            _verificationUpdate = verificationUpdate;
        }
    }
    return (
        { updatedVerification: _verificationUpdate }
    )
}

export default updateVerificationUpdate