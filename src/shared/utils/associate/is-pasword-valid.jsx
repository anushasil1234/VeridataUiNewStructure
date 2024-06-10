import { patternChecking } from ".."

const isPaswordValid = (input) => {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return patternChecking(input, pattern);
}

export default isPaswordValid