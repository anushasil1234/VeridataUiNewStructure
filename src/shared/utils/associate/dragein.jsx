export const calculateDragPosition = (isDragging, lastMousePosition, currentMousePosition, prevPosition) => {
    if (!isDragging) return prevPosition;

    const deltaX = currentMousePosition.x - lastMousePosition.x;
    const deltaY = currentMousePosition.y - lastMousePosition.y;

    return {
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
    };
};