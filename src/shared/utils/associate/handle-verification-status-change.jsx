import upDateQuestionSet from "./update-question-set";
import updateVerificationUpdate from "./update-verification-update";

const handleVerificationStatusChange = ({ verificationQuestionSet, verificationUpdate, verificationType, subCategoryList, fileSrc }) => {
  let updatedQuestionSet = verificationQuestionSet;
  let updatedVerification = verificationUpdate;

  subCategoryList.forEach((subCategory) => {
    const questionSetUpdate = upDateQuestionSet({
      verificationQuestionSet: updatedQuestionSet,
      verificationUpdate: updatedVerification,
      verificationType,
      subCategory,
      fileSrc,
    });

    updatedQuestionSet = questionSetUpdate.updatedQuestionSet;

    // Ensure verification updates accumulate for each subcategory
    const verificationUpdateUpdate = updateVerificationUpdate({
      verificationUpdate: updatedVerification,
      verificationQuestionSet: updatedQuestionSet,
      updatedQuestionSet,
      subCategory,
    });

    updatedVerification = verificationUpdateUpdate.updatedVerification;
  });

  return { updatedQuestionSet, updatedVerification };
};

export default handleVerificationStatusChange;
