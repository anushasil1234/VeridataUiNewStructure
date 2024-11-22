import { validationsCheck } from "..";

const validateQuestionSet = (verificationQuestionSet, verificationUpdate) => {
    let error;
    console.log('verificationQuestionSet', verificationQuestionSet, verificationUpdate);
    if (Object.keys(verificationUpdate).length === 0) {
        error = `Please select appropiate answer for the questions`;
    } else {
        for (let index = 0; index < verificationQuestionSet.length; index++) {
            const { disabled, name, subCategory, label } = verificationQuestionSet[index];
            const _name = `${name}_${subCategory}`;

            console.log('validationQuestionSet', verificationQuestionSet, _name);
            
            if (disabled === false) {
                if (!validationsCheck(verificationUpdate[_name], _name)) {
                    error = `Please select the field "${label}"`;
                    break;
                }
            }
        }
    }
    return { error }
}

export default validateQuestionSet