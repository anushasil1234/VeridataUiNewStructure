export const handleSort = (rows, order) => {

    return rows.sort((a, b) => {
        const nameA = a["property"]; // convert to uppercase to ignore case
        const nameB = b["property"]; // convert to uppercase to ignore case
        if (order === "asc") {
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        } else {
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
        }

        return 0;
    });
}