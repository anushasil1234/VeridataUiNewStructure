
const downloadFile = (linkSource, fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = linkSource;
    downloadLink.target = "_blank";
    downloadLink.click();
}

export default downloadFile