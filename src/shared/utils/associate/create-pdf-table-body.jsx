import { DDMMYYYY } from '..';

export const CreatePdfTableBody = (object, columnList) => {
    let tableBody = [];
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {

            columnList.forEach(({ enums, type }) => {
                if (enums.includes(key)) {
                    if (type == 'date') {
                        tableBody = [...tableBody, DDMMYYYY(object[key])];
                    } else {
                        tableBody = [...tableBody, object[key]];
                    }

                }
            });
        }
    }
    return tableBody
}
