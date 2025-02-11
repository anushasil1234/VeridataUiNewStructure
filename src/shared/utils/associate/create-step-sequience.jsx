export const CreateStepSequience = ({ isHandicap, isPassportAvailable, stepCounter }) => {
    let _steps = {};
    let _stepCounter = stepCounter;


    if (isHandicap === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            HV: {
                step: _stepCounter,
                name: 'Handicap Verification'
            }
        }
    }
    if (isPassportAvailable === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            PV: {
                step: _stepCounter,
                name: 'Passport Verification'
            }
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        CF: {
            step: _stepCounter,
            name: 'Certificate / File Upload'
        }
    }
    _stepCounter = _stepCounter + 1;

    _steps = {
        ..._steps,
        PFD: {
            step: _stepCounter,
            name: 'PF Details'
        },
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
            name: 'PAN Verification (optional)'
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