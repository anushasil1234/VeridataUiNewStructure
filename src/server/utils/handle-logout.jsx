const handleClickOnLogout = () => window.dispatchEvent(new CustomEvent("logout"));

export default handleClickOnLogout;