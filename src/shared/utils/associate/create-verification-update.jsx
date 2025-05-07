// const createVerificationUpdate = (verificationUpdates) => {
//   const result = {};
//   for (const [key, value] of Object.entries(verificationUpdates)) {
//     const [fieldName, subCategory] = key.split('_');
//     if (!result[subCategory]) {
//       result[subCategory] = { subCategory, VerificationQueries: [] };
//     }
//     result[subCategory].VerificationQueries.push({ fieldName, value });
//   }
//   return { VerificationSubCategoryList: Object.values(result) };
// };
// export default createVerificationUpdate;
