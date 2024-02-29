import  secureLocalStorage  from  "react-secure-storage";


export const setLocalStorageItem = (id, data) => {
    secureLocalStorage.setItem(id, JSON.stringify(data))
    
}

