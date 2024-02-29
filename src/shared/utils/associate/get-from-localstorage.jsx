import  secureLocalStorage  from  "react-secure-storage";

export const getLocalStorageItem = (id) => {
    return JSON.parse(secureLocalStorage.getItem(id))
}