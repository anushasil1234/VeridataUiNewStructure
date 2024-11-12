import upDateQuestionSet from './update-question-set';
import updateVerificationUpdate from './update-verification-update';

const handleVerificationStatusChange = ({ verificationQuestionSet, verificationUpdate, verificationType }) => {

  const { updatedQuestionSet } = upDateQuestionSet({ verificationQuestionSet, verificationUpdate, verificationType });
  const { updatedVerification } = updateVerificationUpdate({ verificationUpdate, verificationQuestionSet, updatedQuestionSet });

  return ({ updatedQuestionSet, updatedVerification })
}

export default handleVerificationStatusChange