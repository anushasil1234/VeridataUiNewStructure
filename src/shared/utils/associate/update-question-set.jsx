import { fileVerificationEnums } from "shared/constants/constants";
import { hasValue } from "..";

const upDateQuestionSet = ({ verificationQuestionSet, verificationUpdate,
    verificationType, subCategory, fileSrc }) => {

    let updatedQuestionSet = verificationQuestionSet;


    if (verificationType.value !== 'none') {

        if (subCategory) {
            const _isDocComplete = subCategory && verificationUpdate[`isDocComplete_${subCategory}`];
            const _isDocValid = subCategory && verificationUpdate[`isDocValid_${subCategory}`];
           
            if (_isDocComplete === true &&
                _isDocValid === true) {
                updatedQuestionSet = updatedQuestionSet.map((question) => {
                    question.disabled = false;
                    return question;
                })
               
            }
            if ((verificationUpdate && (_isDocComplete !== true || _isDocValid !== true)) &&
                verificationQuestionSet && verificationQuestionSet.length > 2) {
                updatedQuestionSet = updatedQuestionSet.map((question, index) => {
                    if (index > 1) {
                        question.disabled = true;
                    }
                    return question;
                })
            

                
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
         
        }
        updatedQuestionSet.map((updatedQuestion) => {
            const { type } = updatedQuestion;
       
            
            if (type === 'prerequisite') {
             
                
                if (hasValue(fileSrc)) {
                    updatedQuestion.disabled = false;
                } else {
                    updatedQuestion.disabled = true;
                }
            }
          
            return updatedQuestion
        })
        
    }
    
    
    return (
        { updatedQuestionSet }
    )
}

export default upDateQuestionSet;