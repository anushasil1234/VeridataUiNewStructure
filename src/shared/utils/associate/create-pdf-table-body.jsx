import { DDMMYYYY } from '..';

export const CreatePdfTableBody = (object, columnList) => {
    let tableBody = [];

    columnList.forEach(({ enums, type }) => {
        // Find all keys from enums that exist in the object
        let values = enums.map(key => object[key]).filter(value => value !== undefined);

        if (values.length > 0) {
            let mainValue = values[0];
            if (type === 'date' && mainValue) {
                mainValue = DDMMYYYY(mainValue);
            }

            // Add additional values in parentheses if there are multiple
            let additionalValues = values.slice(1).join(', ');
            let finalValue = additionalValues ? `${mainValue} (${additionalValues})` : mainValue;

            tableBody.push(finalValue);
        } else {
            tableBody.push(''); // Add empty string if no keys in enums are present in the object
        }
    });

    return tableBody;
}
