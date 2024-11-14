import { validationsCheck } from "..";

const validateQuestionSet = (verificationQuestionSet, verificationUpdate) => {
    let error;
    for (let index = 0; index < verificationQuestionSet.length; index++) {
        const { disabled, name, label } = verificationQuestionSet[index];
        if (disabled === false) {
            if (!validationsCheck(verificationUpdate[name], name)) {
                error = `Please select the field "${label}"`;
                break;
            }
        }
    }
    return {error}
}

export default validateQuestionSet