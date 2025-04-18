export const CreateStepSequience = ({ isHandicap, isPassportAvailable, stepCounter,t }) => {
    let _steps = {};
    let _stepCounter = stepCounter;

    console.log('ispassportAvailable',isPassportAvailable,stepCounter,isHandicap);
    // if (isHandicap === 'Y') {
    //     _stepCounter = _stepCounter + 1;
    //     _steps = {
    //         ..._steps,
    //         HV: {
    //             step: _stepCounter,
    //             name: 'Handicap Verification'
    //         }
    //     }
    // }
    if (isPassportAvailable === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            PV: {
                step: _stepCounter,
                name: t("Passport Verification"),
            }
        }
    }
    //if (isPassportAvailable === 'Y') {
        _stepCounter = _stepCounter + 1;
    
    //}


    _steps = {
        ..._steps,
        CF: {
            step: _stepCounter,
            name: t('Certificate / File Upload')
        }
    }
    //_stepCounter = _stepCounter + 1;

    if (isHandicap === 'Y') {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            HV: {
                step: _stepCounter,
                name: t('Handicap Verification'),
            }
        }
    }
    _stepCounter = _stepCounter + 1;


    _steps = {
        ..._steps,
        PFD: {
            step: _stepCounter,
            name: t('PF Details')
        },
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        AV: {
            step: _stepCounter,
            name: t('Aadhaar Verification')
        }
    }

    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        DLV: {
            step: _stepCounter,
            name: t('Driving License Verification')
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        PAV: {
            step: _stepCounter,
            name: t('PAN Verification (optional)')
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        BAV: {
            step: _stepCounter,
            name: t('Bank Verification')
        }
    }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        FIRV: {
            step: _stepCounter,
            name: t('FIR Verification')
        }
    }
    // _stepCounter = _stepCounter + 1;
    // _steps = {
    //     ..._steps,
    //     ID: {
    //         step: _stepCounter,
    //         name: 'Insurance Details'
    //     }
    // }
    _stepCounter = _stepCounter + 1;
    _steps = {
        ..._steps,
        UAV: {
            step: _stepCounter,
            name: t('UAN Verification')
        }
    }

    return _steps;
//    return (
//     <div>
//         {Object.keys(_steps).map((stepKey, index) => (
//             <div key={stepKey}>
//                 <h2>Step {index + 1}: {_steps[stepKey].name}</h2>
//                 {/* Render the step content here */}
//             </div>
//         ))}
//     </div>
//);
}