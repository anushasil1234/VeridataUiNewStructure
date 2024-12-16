import  secureLocalStorage  from  "react-secure-storage";
import CryptoJS from "crypto-js";
const SECRET_KEY = process.env.REACT_APP_SESSION_STORAGE_SECRET_KEY;  // Keep this key secure and consistent.
// const SECRET_KEY = 'sdk43W$dfsde';

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined.");
}
const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
const decryptData = (ciphertext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedData) {
            throw new Error("Decryption failed. Malformed ciphertext or wrong key.");
        }
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error during decryption:", error);
        throw error;
    }
};

// Usage with sessionStorage
// export const setLocalStorageItem = (key, value) => {
//     const encryptedValue = encryptData(value);
//     sessionStorage.setItem(key, encryptedValue);
// };

export const getLocalStorageItem = (key) => {
    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) return null;
    return decryptData(encryptedValue);
};

// export const getLocalStorageItem = (id) => {
//     return JSON.parse(secureLocalStorage.getItem(id))
// }