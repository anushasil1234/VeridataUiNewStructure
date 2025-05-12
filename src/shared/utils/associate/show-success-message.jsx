const showSuccessMessage = (message) => {
  window.dispatchEvent(new CustomEvent('show-success', { detail: { message } }));
};
export default showSuccessMessage;
