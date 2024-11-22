export const MouseEventHandler = ({
    zoomLevel,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown
}) => {
  
    const  getMouseEventHandlers = () => {
        if (zoomLevel <= 1) {
            return {};
        }
        return {
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            onMouseDown: handleMouseDown,
        };
    };
    return getMouseEventHandlers();
};


