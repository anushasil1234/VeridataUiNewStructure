export const addIsCheckFlag = (rows, selected) => {
    return rows && rows.map((row, index) => {
      row.isChecked = false;
      selected.map((selectedIndex) => {
        if (selectedIndex === index) {
          row.isChecked = true;
        }
      }, row)
      return row
    }, selected)

  }