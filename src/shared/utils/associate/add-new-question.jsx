import { epfFileCategoryTypeAlias, fatherFileCategoryTypeAlias, fatherVerificationQuestionSet, passbookVerificationQuestionSet } from "shared/constants/constants"

const addNewQuestion = ({
    verificationType,
    verificationQuestionSet
}) => {
    const _fatherVerificationQuestionSet = JSON.parse(JSON.stringify(fatherVerificationQuestionSet));
    const _passbookVerificationQuestionSet = JSON.parse(JSON.stringify(passbookVerificationQuestionSet));
    let updatedQuestion;
    if (verificationType.value === fatherFileCategoryTypeAlias) {
        updatedQuestion = _fatherVerificationQuestionSet;
    }
    if (verificationType.value === epfFileCategoryTypeAlias) {
        updatedQuestion = _passbookVerificationQuestionSet;
    }
  

    // console.log("addNewQuestionupdatedQuestionSet", {
    //     updatedQuestionSet:
    //         [
    //             ...verificationQuestionSet,
    //             ...updatedQuestion
    //         ]
    // });

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