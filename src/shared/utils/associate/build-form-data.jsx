const buildFormData = (payLoad) => {
    console.log('payLoad3223434', payLoad);

    let formData = new FormData();
    for (const property in payLoad) {
        if (Object.hasOwnProperty.call(payLoad, property)) {
            if (payLoad[property] === "") {
                delete payLoad[property];
            } else {
                if (property === "fileUploaded") {

                    formData.append(`${property}`, JSON.stringify(payLoad[property]));
                    console.log('formData', formData, property, JSON.stringify(payLoad[property]));

                } else if (property === "FileDetails") {
                    console.log('property', property);

                    if (payLoad?.FileDetails?.length > 0) {
                        // If FileDetails is not empty, append the first element
                        payLoad?.FileDetails?.forEach((element, index) => {
                            formData.append(`${property}`, payLoad[property][index]);
                        });
                    }
                } else {
                    formData.append(`${property}`, payLoad[property]);
                }
            }
        }
    }
    return formData;
};
export default buildFormData