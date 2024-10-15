export const CreateStepSequience = ({ isHandicap, isPassportAvailable, stepCounter }) => {
    let _steps = {};
    let _stepCounter = stepCounter;
    if (isHandicap === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            HV: {
                step: _stepCounter,
                name: 'Handicap verification'
            }
        }
    }
    if (isPassportAvailable === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            PV: {
                step: _stepCounter,
                name: 'Passport verification'
            }
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        AV: {
            step: _stepCounter,
            name: 'Aadhaar Verification'
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        PAV: {
            step: _stepCounter,
            name: 'PAN Verification'
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        UAV: {
            step: _stepCounter,
            name: 'UAN Verification'
        }
    }
    return _steps;
}