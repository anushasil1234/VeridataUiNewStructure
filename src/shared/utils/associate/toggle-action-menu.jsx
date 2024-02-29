export const toggleActionMenu = (degree, actionIconList) => {

    let degreeOfRotation = - degree + 45;
    let actionIconListDisplay = !actionIconList;
    return ({
        degreeOfRotation,
        actionIconListDisplay
    });
}