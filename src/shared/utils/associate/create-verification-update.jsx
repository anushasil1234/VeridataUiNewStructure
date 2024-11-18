const createVerificationUpdate = (verificationUpdates) => {
    const result = {};

    // Iterate through each key-value pair in verificationUpdates
    for (const [key, value] of Object.entries(verificationUpdates)) {
        const [fieldName, subCategory] = key.split('_'); // Split key into fieldName and subCategory
        if (!result[subCategory]) {
            result[subCategory] = { subCategory, VerificationQueries: [] }; // Initialize subCategory structure
        }
        // Add fieldName and its value to the subCategory's VerificationQueries
        result[subCategory].VerificationQueries.push({ fieldName, value });
    }
    // Convert the result object into an array
    return { VerificationSubCategoryList: Object.values(result) };
}

export default createVerificationUpdate