import { getCountryList, getDisabilityList, getEntityList, getFileTypeList, getGenderList, getMaritalStatusList, getNationalityList, getQualificationList, getReportFilterStatusList, getRoleList } from "server/apis";
import { days, dayscoustom, genderList, relationList, upcomingRecruitsStatusList } from "shared/constants/constants";
import showErrorMessage from "shared/utils/associate/show-error-message";

export const getDropdownList = async () => {
  try {

    const nationalityList = await getNationalityList();
    const countryList = await getCountryList();
    const maritalStatusList = await getMaritalStatusList();
    const disabilityList = await getDisabilityList();
    const qualificationList = await getQualificationList();
    const fileTypeList = await getFileTypeList();
    const roleList = await getRoleList();
    const reportFilterStatusList = await getReportFilterStatusList();
    const entityList = await getEntityList();
    const genderList = await getGenderList();

    const dropdownList = {
      genderList: genderList && genderList.responseInfos,
      days: days,
      dayscoustom: dayscoustom,
      upcomingRecruitsStatusList: upcomingRecruitsStatusList,
      nationalityList: nationalityList && nationalityList.responseInfos,
      countryList: countryList && countryList.responseInfos,
      maritalStatusList: maritalStatusList && maritalStatusList.responseInfos,
      disabilityList: disabilityList && disabilityList.responseInfos,
      qualificationList: qualificationList && qualificationList.responseInfos,
      fileTypeList: fileTypeList && fileTypeList.responseInfos,
      roleList: roleList && roleList.responseInfos,
      reportFilterStatusList: reportFilterStatusList && reportFilterStatusList.responseInfos,
      entityList: entityList && entityList.responseInfos,
      relationList: relationList
    };
    console.log('dropdownList12', entityList);

    return dropdownList;
  } catch (error) {
    showErrorMessage(error);
  }

};
