import { epfFileCategoryTypeAlias, fatherFileCategoryTypeAlias, fatherVerificationQuestionSet, passbookVerificationQuestionSet } from "shared/constants/constants"

const addNewQuestion = ({
    verificationType,
    verificationQuestionSet
}) => {

    let updatedQuestion;
    if (verificationType.value === fatherFileCategoryTypeAlias) {
        updatedQuestion = fatherVerificationQuestionSet;
    }
    if (verificationType.value === epfFileCategoryTypeAlias) {
        updatedQuestion = passbookVerificationQuestionSet;
    }
    return (
        {
            updatedQuestionSet:
                [
                    ...verificationQuestionSet,
                    ...updatedQuestion
                ]
        }
    )
}

export default addNewQuestion