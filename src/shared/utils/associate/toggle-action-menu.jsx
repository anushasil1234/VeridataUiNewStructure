export const toggleActionMenu = (degree, actionIconList) => {
  // If the list is currently hidden, rotate to 45 degrees to show it
  // If the list is currently shown, rotate back to 0 degrees to hide it
  let degreeOfRotation = actionIconList ? 0 : 45;
  let actionIconListDisplay = !actionIconList;
  return {
    degreeOfRotation,
    actionIconListDisplay,
  };
};
