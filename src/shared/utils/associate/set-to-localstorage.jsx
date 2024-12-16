import  secureLocalStorage  from  "react-secure-storage";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SESSION_STORAGE_SECRET_KEY; // Keep this key secure and consistent.
// const SECRET_KEY = 'sdk43W$dfsde'; // Keep this key secure and consistent.

// Encrypt data
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined.");
}

// Encrypt function
const encryptData = (data) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    } catch (error) {
        console.error("Error during encryption:", error);
        throw error;
    }
};
// Decrypt data
const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Usage with sessionStorage
export const setLocalStorageItem = (key, value) => {
    const encryptedValue = encryptData(value);
    sessionStorage.setItem(key, encryptedValue);
};

const retrieveData = (key) => {
    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) return null;
    return decryptData(encryptedValue);
};


// export const setLocalStorageItem = (id, data) => {
//     secureLocalStorage.setItem(id, JSON.stringify(data))
    
// }


