import  secureLocalStorage  from  "react-secure-storage";


export const removeLocalStorageItems = (idList) => {
    idList.forEach(id => {
        sessionStorage.removeItem(id);
    });
}
// export const removeLocalStorageItems = (idList) => {
//     idList.forEach(id => {
//         secureLocalStorage.removeItem(id);
//     });
// }