import { validationsCheck } from "..";

const validateQuestionSet = (verificationQuestionSet, verificationUpdate) => {
    let error;
    for (let index = 0; index < verificationQuestionSet.length; index++) {
        const { disabled, name, subCategory, label } = verificationQuestionSet[index];
        const _name = `${name}_${subCategory}`;
        if (disabled === false) {
            if (!validationsCheck(verificationUpdate[_name], _name)) {
                error = `Please select the field "${label}"`;
                break;
            }
        }
    }
    return {error}
}

export default validateQuestionSet