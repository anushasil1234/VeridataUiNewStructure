const buildFormData = (payLoad) => {
  let formData = new FormData();
  for (const property in payLoad) {
    if (Object.hasOwnProperty.call(payLoad, property)) {
      if (payLoad[property] === '') {
        delete payLoad[property];
      } else {
        if (property === 'fileUploaded') {
          formData.append(`${property}`, JSON.stringify(payLoad[property]));
        } else if (property === 'fileDetails') {
          if (payLoad?.fileDetails?.length > 0) {
            payLoad?.fileDetails?.forEach((element, index) => {
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
export default buildFormData;
