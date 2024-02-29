export const selectCheckedRows = (rows, selected) => {
    return selected && selected.map((checkedIndex) => {
        rows[checkedIndex].isChecked = true;
        return rows[checkedIndex]
    }, rows)

}