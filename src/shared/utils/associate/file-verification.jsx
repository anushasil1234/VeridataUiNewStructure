import React from 'react'

const fileValidation = (parameter, value) => {
    let error;
    switch (key) {
        case 'isDocComplete':
            if (value === undefined) {
                error = 'Please select is doc complete'
            }
            break;
        case 'isDocValid':
            if (value === undefined) {
                error = 'Please select is doc valid'
            }
            break;
    
        default:
            break;
    }
//   return (
//   )
}

export default fileVerification