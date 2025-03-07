import { roleTypeEnums } from "shared/constants/constants";
import { getLocalStorageItem } from "..";

const isAdmin = () => {
    const userDetails = getLocalStorageItem("pfc-user");
    return roleTypeEnums && !roleTypeEnums.candidate.includes(userDetails.userTypeId);
};
export default isAdmin;