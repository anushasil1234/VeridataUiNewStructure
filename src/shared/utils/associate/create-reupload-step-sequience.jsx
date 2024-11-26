import React from 'react'

const createReuploadStepSequience = ({ isUanVarified, isFathersNameVarified }) => {

    let _steps = {};
    let _stepCounter = 0;
    if (isFathersNameVarified === false) {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            FC: {
                step: _stepCounter,
                name: `Father's name related document`
            }
        }
    }
    if (isUanVarified === false) {
        _stepCounter = _stepCounter + 1;
        _steps = {
            ..._steps,
            EPFO: {
                step: _stepCounter,
                name: `EPFO Service History and Passbook`
            }
        }
    }
   
  return (
    _steps
  )
}

export default createReuploadStepSequience