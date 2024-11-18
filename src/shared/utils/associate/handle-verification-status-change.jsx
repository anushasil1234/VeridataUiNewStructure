import upDateQuestionSet from './update-question-set';
import updateVerificationUpdate from './update-verification-update';

const handleVerificationStatusChange = ({ verificationQuestionSet, verificationUpdate, verificationType, subCategory, fileSrc }) => {

  const { updatedQuestionSet } = upDateQuestionSet({ verificationQuestionSet, verificationUpdate, verificationType, subCategory, fileSrc });
  const { updatedVerification } = updateVerificationUpdate({ verificationUpdate, verificationQuestionSet, updatedQuestionSet, subCategory });

  return ({ updatedQuestionSet, updatedVerification })
}

export default handleVerificationStatusChange