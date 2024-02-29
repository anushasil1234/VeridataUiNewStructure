class FabIconPropsModel {
    constructor(fabStyle, handleClick, color, ariaLabel, icon, toolTipTitle, index, placement, size) {
        this.fabStyle = fabStyle;
        this.handleClick = handleClick;
        this.color = color;
        this.ariaLabel = ariaLabel;
        this.icon = icon;
        this.toolTipTitle = toolTipTitle;
        this.index = index ?? 0;
        this.placement = placement ?? "left-end";
        this.size = size ?? "small"

    }
}
export default FabIconPropsModel;