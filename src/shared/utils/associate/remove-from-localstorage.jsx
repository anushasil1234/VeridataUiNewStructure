import  secureLocalStorage  from  "react-secure-storage";


export const removeLocalStorageItems = (idList) => {
    idList.forEach(id => {
        secureLocalStorage.removeItem(id);
    });
}