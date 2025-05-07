// import { epfoPassbookFileTypeAlias, fileVerificationEnums } from 'shared/constants/constants';
// import { hasValue } from '..';
// const upDateQuestionSet = ({
//   verificationQuestionSet,
//   verificationUpdate,
//   verificationType,
//   subCategory,
//   fileSrc,
// }) => {
//   console.log("in updateQuestionSet", verificationQuestionSet, verificationUpdate, verificationType, subCategory, fileSrc);
//   let updatedQuestionSet = verificationQuestionSet;
//   if (verificationType.value !== 'none') {
//     if (subCategory) {
//       let _isDocComplete = true;
//       let _isDocValid = true;
//       for (const [key, value] of Object.entries(verificationUpdate)) {
//         if (key.startsWith('isDocComplete') && !value) {
//           _isDocComplete = false;
//           break;
//         }
//       }
//       for (const [key, value] of Object.entries(verificationUpdate)) {
//         if (key.startsWith('isDocValid') && !value) {
//           _isDocValid = false;
//           break;
//         }
//       }
//       if (_isDocComplete === true && _isDocValid === true) {
//         updatedQuestionSet = updatedQuestionSet?.map((question) => {
//           question.disabled = false;
//           return question;
//         });
//       }
//       if (
//         verificationUpdate &&
//         (_isDocComplete !== true || _isDocValid !== true) &&
//         verificationQuestionSet &&
//         verificationQuestionSet.length > 2
//       ) {
//         updatedQuestionSet = updatedQuestionSet.map((question, index) => {
//           if (index > 1) {
//             question.disabled = true;
//           }
//           return question;
//         });
//       }
//     }
//     if (
//       verificationUpdate &&
//       verificationUpdate.hasOwnProperty(fileVerificationEnums.pensionApplicable) &&
//       verificationUpdate[fileVerificationEnums.pensionApplicable] === false
//     ) {
//       updatedQuestionSet = updatedQuestionSet.map((question) => {
//         if (question.name === fileVerificationEnums.pensionGapFound) {
//           question.disabled = true;
//         }
//         return question;
//       });
//     }
//     updatedQuestionSet.map((updatedQuestion) => {
//       const { type } = updatedQuestion;
//       if (type === 'prerequisite') {
//         if (hasValue(fileSrc)) {
//           updatedQuestion.disabled = false;
//         } else {
//           updatedQuestion.disabled = true;
//         }
//       }
//       return updatedQuestion;
//     });
//   }
//   if (
//     verificationUpdate &&
//     verificationUpdate.hasOwnProperty(
//       `${fileVerificationEnums.pensionApplicable}_${epfoPassbookFileTypeAlias}`,
//     ) &&
//     verificationUpdate[
//       `${fileVerificationEnums.pensionApplicable}_${epfoPassbookFileTypeAlias}`
//     ] === false
//   ) {
//     for (let index = updatedQuestionSet.length - 1; index >= 0; index--) {
//       const { name, subCategory } = updatedQuestionSet[index];
//       if (
//         `${name}_${subCategory}` ===
//         `${fileVerificationEnums.pensionGapFound}_${epfoPassbookFileTypeAlias}`
//       ) {
//         updatedQuestionSet[index].disabled = true;
//         break;
//       }
//     }
//   }
//   return { updatedQuestionSet };
// };
// export default upDateQuestionSet;
