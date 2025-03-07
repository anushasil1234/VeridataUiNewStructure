import Message from "../models/message";


const showErrorMessage = (message) => {
    window.dispatchEvent(new CustomEvent("show-error", { detail: {message}}));
}

export default showErrorMessage