const updateVerificationUpdate = ({ verificationUpdate, verificationQuestionSet, updatedQuestionSet, subCategory }) => {

    // console.log('updateVerificationUpdate',);

    const _isDocComplete = verificationUpdate[`isDocComplete_${subCategory}`];
    const _isDocValid = verificationUpdate[`isDocValid_${subCategory}`];
    const _isPensionApplicable = verificationUpdate?.[`isPensionApplicable_${subCategory}`];
    let _verificationUpdate = {};
    if ((_isDocComplete === false || _isDocValid === false) &&
        verificationQuestionSet.length > 2) {
        // console.log('inside ::');

        updatedQuestionSet.map(({ name, disabled, subCategory }) => {
            const _name = `${name}_${subCategory}`;
            if (disabled === false) {
                return _verificationUpdate = { ..._verificationUpdate, [_name]: verificationUpdate[_name] }
            }
        })
    }
    else {
        if (_isDocComplete === true &&
            _isDocValid === true &&
            _isPensionApplicable === false
        ) {
            updatedQuestionSet.map(({ name, subCategory }) => {
                const _name = `${name}_${subCategory}`;
                if (_isPensionApplicable === false && _name === `isPensionGapFound_${subCategory}`) {
                    return _verificationUpdate = { ..._verificationUpdate, [_name]: false }
                } else {
                    return _verificationUpdate = { ..._verificationUpdate, [_name]: verificationUpdate[_name] }
                }
            })
        } else {
            _verificationUpdate = verificationUpdate;
        }
    }
    // let isdependentQuestionDisabled = true;
    updatedQuestionSet.map(({ name, disabled, subCategory }) => {
        const _name = `${name}_${subCategory}`;
        if (disabled === false) {

            return _verificationUpdate = { ..._verificationUpdate, [_name]: verificationUpdate[_name] }
        }
        // console.log("_name123", _name, updatedQuestionSet, _verificationUpdate);
    })
    // updatedQuestionSet.map(({ name, disabled, subCategory }) => {
    //     const _name = `${name}_${subCategory}`;
    //     if (disabled === false) {
    //         return _verificationUpdate = { ..._verificationUpdate, [_name]: verificationUpdate[_name] }
    //     }
    // })

    return (
        { updatedVerification: _verificationUpdate }
    )
}

export default updateVerificationUpdate