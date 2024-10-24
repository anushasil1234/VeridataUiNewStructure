const generateBlobFromBase64 = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};
export default generateBlobFromBase64;