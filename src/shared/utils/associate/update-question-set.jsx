import { fileVerificationEnums } from "shared/constants/constants";

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
        if (verificationUpdate.hasOwnProperty(fileVerificationEnums.pensionApplicable) &&
            verificationUpdate[fileVerificationEnums.pensionApplicable] === false) {
                
            updatedQuestionSet = updatedQuestionSet.map((question) => {
                if (question.name === fileVerificationEnums.pensionGapFound) {
                    question.disabled = true;
                }
                return question
            })
            console.log("updatedQuestionSet", updatedQuestionSet);


        }
        return (
            { updatedQuestionSet }
        )
    }
}

export default upDateQuestionSet;