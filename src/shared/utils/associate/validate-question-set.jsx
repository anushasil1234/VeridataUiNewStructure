import { validationsCheck } from "..";

const validateQuestionSet = (verificationQuestionSet, verificationUpdate) => {
    let error;
  
    if (Object.keys(verificationUpdate).length === 0) {
        error = `Please select appropiate answer for the questions`;
    } else {
        for (let index = 0; index < verificationQuestionSet.length; index++) {
            const { disabled, name, subCategory, label } = verificationQuestionSet[index];
            const _name = `${name}_${subCategory}`;
            
            if (disabled === false) {
                if (!validationsCheck(verificationUpdate[_name], _name)) {
                    error = `Please answer the question "${label}"`;
                    break;
                }
            }
        }
    }
    return { error }
}

export default validateQuestionSet