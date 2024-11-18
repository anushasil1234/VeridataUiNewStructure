import { fileVerificationEnums } from "shared/constants/constants";
import { hasValue } from "..";

const upDateQuestionSet = ({ verificationQuestionSet, verificationUpdate,
    verificationType, subCategory, fileSrc }) => {

    let updatedQuestionSet = verificationQuestionSet;
console.log("updatedQuestionSet 12", updatedQuestionSet);

    if (verificationType.value !== 'none') {

        if (subCategory) {
            const _isDocComplete = subCategory && verificationUpdate[`isDocComplete_${subCategory}`];
            const _isDocValid = subCategory && verificationUpdate[`isDocValid_${subCategory}`];
            console.log("_isDocComplete", _isDocComplete);
            console.log("_isDocValid", _isDocValid);
            if (_isDocComplete === true &&
                _isDocValid === true) {
                updatedQuestionSet = updatedQuestionSet.map((question) => {
                    question.disabled = false;
                    return question;
                })
                console.log("inside hasupdatedQuestionSet", updatedQuestionSet);


            }
            if ((verificationUpdate && (_isDocComplete !== true || _isDocValid !== true)) &&
                verificationQuestionSet && verificationQuestionSet.length > 2) {
                updatedQuestionSet = updatedQuestionSet.map((question, index) => {
                    if (index > 1) {
                        question.disabled = true;
                    }
                    return question;
                })
                console.log("inside hasupdatedQuestionSet", updatedQuestionSet);

                
            }
        }
        if (verificationUpdate && verificationUpdate.hasOwnProperty(fileVerificationEnums.pensionApplicable) &&
            verificationUpdate[fileVerificationEnums.pensionApplicable] === false) {

            updatedQuestionSet = updatedQuestionSet.map((question) => {
                if (question.name === fileVerificationEnums.pensionGapFound) {
                    question.disabled = true;
                }
                
                return question
            })
            console.log("inside hasupdatedQuestionSet", updatedQuestionSet);
        }
        updatedQuestionSet.map((updatedQuestion) => {
            const { type } = updatedQuestion;
            console.log("updatedQuestion ababa", updatedQuestion);
            
            if (type === 'prerequisite') {
                console.log('fileSrc', fileSrc);
                
                if (hasValue(fileSrc)) {
                    updatedQuestion.disabled = false;
                } else {
                    updatedQuestion.disabled = true;
                }
            }
            console.log("inside hasupdatedQuestionSet2", updatedQuestion);

            return updatedQuestion
        })
        console.log("updatedQuestionSet", updatedQuestionSet);
    }
    console.log("updatedQuestionSet inside", updatedQuestionSet);
    
    return (
        { updatedQuestionSet }
    )
}

export default upDateQuestionSet;