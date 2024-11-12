
const upDateQuestionSet = ({ verificationQuestionSet, verificationUpdate, verificationType }) => {
    if (verificationType.value !== 'none') {
        let updatedQuestionSet = verificationQuestionSet;
        if (verificationUpdate.isDocComplete === true && verificationUpdate.isDocValid === true) {
            updatedQuestionSet = updatedQuestionSet.map((question) => {
                question.disabled = false;
                return question
            })
        }

        if ((verificationUpdate && (verificationUpdate.isDocComplete !== true || verificationUpdate.isDocValid !== true)) &&
            verificationQuestionSet && verificationQuestionSet.length > 2) {
            updatedQuestionSet = updatedQuestionSet.map((question, index) => {
                if (index > 1) {
                    question.disabled = true;
                }
                return question
            })
        }
        return (
            { updatedQuestionSet }
        )
    }
}

export default upDateQuestionSet;