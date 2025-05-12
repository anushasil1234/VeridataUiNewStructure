import React, { useState, useEffect, useCallback } from 'react';
import ConfirmationModel from 'shared/utils/modals/confirmation-modal';
import ConsentModal from 'shared/utils/modals/consent-modal';
import InfoModel from 'shared/utils/modals/info-modal';
import OtpGenerationForm from '../../components/otp/otp-generation/otp-generation';
import OtpSubmitionForm from '../../components/otp/otp-submition/otp-submition';
import ConfirmationYesNoModal from 'shared/utils/modals/confirmation-modal-yes-no';
import { useDispatch, useSelector } from 'react-redux';
import { storeFunction } from 'store/slices/function-slice';
import AppointeeView from 'modules/appointee/view/appointee-view';
import ManualverifidView from 'modules/appointee/view/manual-verified-details-view';
import PassbookView from 'modules/appointee/view/passbook-details-view';
import EmploymentView from 'modules/appointee/view/employment-details-view';
import UserView from 'modules/user/user-view/user-view';
import RemarksInputModel from '../modals/remarks-modal';
import RemarksTable from 'shared/components/remarks-table/remarks-table';
import { noRemarks, noRemarksMsg, toLogin, toUserLogin } from 'shared/constants/constants';
import SubmitModal from '../modals/submit-modal';
import IssueRemedy from '../issue-remedy/issue-remedy';
import DocumentView from 'shared/components/document-view/document-view';
import ProfilePasswordForm from 'shared/components/password-forms/password-form';
import FilePasswordForm from 'shared/components/password-forms/file-password-form';
import { useLocation } from 'react-router-dom';
import { storeSetRemarksFunction } from 'store/slices/set-remarks-functions-slice';
import { getRemarks } from 'server/apis';
import showErrorMessage from '../associate/show-error-message';
import UploadedDocumentView from 'shared/components/document-view/uploaded-document-view';
import LicenceModal from '../modals/license-modal';
const defaultModalState = {
  licenceModalOpen: false,
  confirmationOpen: false,
  confirmationYesNoOpen: false,
  otpSubmitionModalOpen: false,
  consentModalOpen: false,
  infoModelOpen: false,
  appointeeViewModalOpen: false,
  manualVerifyModalOpen: false,
  passbookViewModalOpen: false,
  employmentModalViewOpen: false,
  userViewModalOpen: false,
  otpFormModalOpen: false,
  remarksInputViewModdalOpen: false,
  remarksModelOpen: false,
  submitModelOpen: false,
  remedyModalOpen: false,
  documentModelOpen: false,
  passwordSubmitionModelOpen: false,
  filePasswordSubmitionModelOpen: false,
};
const Modals = ({ closeModal }) => {
  const dispatch = useDispatch();
  const functionSlice = useSelector((state) => state.functionSlice);
  const SetRemarksFunctionSlice = useSelector((state) => state.SetRemarksFunctionSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const { pathname } = useLocation();
  const [modalState, setModalState] = useState(defaultModalState);
  const [confirmationModelContent, setConfirmationModelContent] = useState(null);
  const [confirmationYesNoModelContent, setConfirmationYesNoModelContent] = useState(null);
  const [otpSubmitionProps, setOtpSubmitionProps] = useState(null);
  const [consentModalContent, setConsentModalContent] = useState(null);
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [licenceModalContent, setLicenceModalContent] = useState(null);
  const [appointeeId, setAppointeeId] = useState(null);
  const [appointeePersonalDetails, setAppointeePersonalDetails] = useState();
  const [passbookDetails, setPassbookDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [epfoDetails, SetepfoDetails] = useState();
  const [generateOtpProps, setGenerateOtpProps] = useState();
  const [remarksInputModelProps, setRemarksInputModelProps] = useState(false);
  const [remarksModelProps, setRemarksModelProps] = useState(false);
  const [submitModelProps, setSubmitModelProps] = useState(false);
  const [remedyModelProps, setRemedyModelProps] = useState(false);
  const [documentModelProps, setDocumentModelProps] = useState();
  const [passwordSubmitionProps, setPasswordSubmitionProps] = useState(false);
  const [filePasswordSubmitionProps, setFilePasswordSubmitionProps] = useState(false);
  const [passbookStatusCode, setPassbookStatusCode] = useState();
  const [uploadedDocumentModelOpen, setUploadedDocumentModelOpen] = useState(false);
  const [uploadedDocumentModelProps, setUploadedDocumentModelProps] = useState();
  const updateModalState = (modal, isOpen) => {
    setModalState((prev) => ({ ...prev, [modal]: isOpen }));
  };
  const openConfirmationModel = useCallback((content, confirmationCallBack) => {
    setConfirmationModelContent({
      ...content,
      confirmedYes: () => {
        confirmationCallBack();
        closeConfirmationModel();
      },
      closeConfirmationModel,
    });
    updateModalState('confirmationOpen', true);
  }, []);
  const closeConfirmationModel = () => {
    updateModalState('confirmationOpen', false);
    setConfirmationModelContent(null);
  };
  const openConfirmationYesNoModal = useCallback((content, yesCallback, noCallback) => {
    setConfirmationYesNoModelContent({
      ...content,
      confirmedYes: () => {
        yesCallback();
        closeConfirmationYesNoModel();
      },
      confirmedNo: () => {
        noCallback();
        closeConfirmationYesNoModel();
      },
    });
    updateModalState('confirmationYesNoOpen', true);
  }, []);
  const closeConfirmationYesNoModel = () => {
    updateModalState('confirmationYesNoOpen', false);
    setConfirmationYesNoModelContent(null);
  };
  const openOtpSubmitionModel = useCallback((otpModelContent) => {
    setOtpSubmitionProps(otpModelContent);
    updateModalState('otpSubmitionModalOpen', true);
  }, []);
  const closeOtpSubmitionModel = () => {
    updateModalState('otpSubmitionModalOpen', false);
  };
  const openConsentModal = useCallback((consentModalContent, consentCallBack) => {
    setConsentModalContent({
      ...consentModalContent,
      consentCallBack,
      closeConsentModal,
    });
    updateModalState('consentModalOpen', true);
  }, []);
  const closeConsentModal = () => {
    updateModalState('consentModalOpen', false);
    setConsentModalContent();
  };
  const openLicenseModal = useCallback((licenceModalContent, liceseCallBack) => {
    setLicenceModalContent({
      ...licenceModalContent,
      liceseCallBack,
      closeLicenseModal,
    });
    updateModalState('licenceModalOpen', true);
  }, []);
  const closeLicenseModal = () => {
    updateModalState('licenceModalOpen', false);
    setLicenceModalContent();
  };
  const openInfoModel = useCallback((infoModelcontent, taskAfterClose) => {
    const handleClickOnOk = () => {
      taskAfterClose && taskAfterClose();
      closeInfoModel();
    };
    setInfoModalContent({ ...infoModelcontent, handleClickOnOk });
    updateModalState('infoModelOpen', true);
  }, []);
  const closeInfoModel = () => {
    updateModalState('infoModelOpen', false);
    setInfoModalContent();
  };
  const openViewModel = useCallback((appointeeId) => {
    setAppointeeId(appointeeId);
    updateModalState('appointeeViewModalOpen', true);
  }, []);
  const closeViewModel = () => {
    updateModalState('appointeeViewModalOpen', false);
  };
  const openVerify = useCallback((personalDetails) => {
    setAppointeePersonalDetails(personalDetails);
    updateModalState('manualVerifyModalOpen', true);
  }, []);
  const closeVerify = () => {
    updateModalState('manualVerifyModalOpen', false);
  };
  const openPassbookViewModel = useCallback((appointeeId, passbookDetails, passbookStatusCode) => {
    setAppointeeId(appointeeId);
    setPassbookStatusCode(passbookStatusCode);
    setPassbookDetails(passbookDetails);
    updateModalState('passbookViewModalOpen', true);
  }, []);
  const closePassbookViewModel = () => {
    updateModalState('passbookViewModalOpen', false);
  };
  const openEmploymentViewModel = useCallback(
    (appointeeId, userId, epfoDetails, passbookStatusCode) => {
      setAppointeeId(appointeeId);
      setUserId(userId);
      SetepfoDetails(epfoDetails);
      setPassbookStatusCode(passbookStatusCode);
      updateModalState('employmentModalViewOpen', true);
    },
    [],
  );
  const closeEmploymentViewModel = () => {
    updateModalState('employmentModalViewOpen', false);
  };
  const openUserViewModel = (userId) => {
    setUserId(userId);
    updateModalState('userViewModalOpen', true);
  };
  const closeUserViewModel = (userId) => {
    updateModalState('userViewModalOpen', false);
  };
  const openOtpForm = useCallback(
    (generateOtpInput, generateOtpInput2, generateOtpLable, generateOtpFunc, headerText) => {
      setGenerateOtpProps({
        generateOtpInput,
        generateOtpInput2,
        generateOtpLable,
        generateOtpFunc,
        headerText,
      });
      updateModalState('otpFormModalOpen', true);
    },
    [],
  );
  const closeOtpForm = () => {
    updateModalState('otpFormModalOpen', false);
    setGenerateOtpProps();
  };
  const openRemarksInputModel = useCallback((remarks) => {
    updateModalState('remarksInputViewModdalOpen', true);
    setRemarksInputModelProps(remarks);
  }, []);
  const closeRemarksInputModel = () => {
    updateModalState('remarksInputViewModdalOpen', false);
  };
  const openRemarksModel = useCallback((remarks) => {
    let remarksList;
    if (remarks && remarks.length > 0) {
      remarksList = remarks;
    } else {
      remarksList = [noRemarks];
    }
    updateModalState('remarksModelOpen', true);
    setRemarksModelProps({ remarksList });
  }, []);
  const closeRemarksModel = () => {
    updateModalState('remarksModelOpen', false);
    setRemarksModelProps();
  };
  const openSubmitModel = useCallback((submitmodalcontent) => {
    updateModalState('submitModelOpen', true);
    setSubmitModelProps({ submitmodalcontent });
  }, []);
  const closeSubmitModel = () => {
    updateModalState('submitModelOpen', false);
    setSubmitModelProps(null);
  };
  const openRemedyModel = useCallback(({ remarksId, remedyType, remedySubType }) => {
    updateModalState('remedyModalOpen', true);
    setRemedyModelProps({ remarksId, remedyType, remedySubType });
  }, []);
  const closeRemedyModel = () => {
    updateModalState('remedyModalOpen', false);
  };
  const openDocumentModel = (fileDetails, filename, fileType) => {
    updateModalState('documentModelOpen', true);
    setDocumentModelProps({ fileDetails, filename, fileType });
  };
  const closeDocumentModel = () => {
    updateModalState('documentModelOpen', false);
  };
  const openPasswordSubmitionModel = useCallback((passwordModelContent) => {
    updateModalState('passwordSubmitionModelOpen', true);
    setPasswordSubmitionProps(passwordModelContent);
  }, []);
  const closePasswordSubmitionModel = () => {
    updateModalState('passwordSubmitionModelOpen', false);
    setPasswordSubmitionProps(false);
  };
  const openFilePasswordSubmitionModel = (passwordModelContent) => {
    updateModalState('filePasswordSubmitionModelOpen', true);
    setFilePasswordSubmitionProps(passwordModelContent);
  };
  const closeFilePasswordSubmitionModel = () => {
    updateModalState('filePasswordSubmitionModelOpen', false);
    setFilePasswordSubmitionProps(false);
  };
  const closeUploadedDocumentModal = () => {
    setUploadedDocumentModelOpen(false);
  };
  const openUploadedDocumentModal = (previewURL, fileName, uploadTypeAlias, mimeType) => {
    setUploadedDocumentModelOpen(true);
    setUploadedDocumentModelProps({ previewURL, fileName, uploadTypeAlias, mimeType });
  };
  const setRemarks = async (appointeeId) => {
    const response = await getRemarks(appointeeId);
    if (response?.responseInfos && response?.responseInfos.length > 0) {
      const remarks = response?.responseInfos;
      openRemarksModel && openRemarksModel(remarks);
    } else {
      showErrorMessage(noRemarksMsg);
    }
  };
  if (SetRemarksFunctionSlice && SetRemarksFunctionSlice.length === 0) {
    dispatch(
      storeSetRemarksFunction({
        setRemarks,
      }),
    );
  }
  useEffect(() => {
    const updateFunctionSlice = (key, value) => {
      if (!functionSlice[0]?.[key]) {
        dispatch(storeFunction({ [key]: value }));
      }
    };
    updateFunctionSlice('openConfirmationModel', openConfirmationModel);
    updateFunctionSlice('openConfirmationYesNoModal', openConfirmationYesNoModal);
    updateFunctionSlice('openOtpSubmitionModel', openOtpSubmitionModel);
    updateFunctionSlice('closeOtpSubmitionModel', closeOtpSubmitionModel);
    updateFunctionSlice('openConsentModal', openConsentModal);
    updateFunctionSlice('closeConsentModal', closeConsentModal);
    updateFunctionSlice('openLicenseModal', openLicenseModal);
    updateFunctionSlice('closeLicenseModal', closeLicenseModal);
    updateFunctionSlice('openInfoModel', openInfoModel);
    updateFunctionSlice('closeInfoModel', closeInfoModel);
    updateFunctionSlice('openViewModel', openViewModel);
    updateFunctionSlice('openVerify', openVerify);
    updateFunctionSlice('openPassbookViewModel', openPassbookViewModel);
    updateFunctionSlice('closePassbookViewModel', closePassbookViewModel);
    updateFunctionSlice('openEmploymentViewModel', openEmploymentViewModel);
    updateFunctionSlice('closeEmploymentViewModel', closeEmploymentViewModel);
    updateFunctionSlice('openUserViewModel', openUserViewModel);
    updateFunctionSlice('openOtpForm', openOtpForm);
    updateFunctionSlice('closeOtpForm', closeOtpForm);
    updateFunctionSlice('openRemarksInputModel', openRemarksInputModel);
    updateFunctionSlice('closeRemarksInputModel', closeRemarksInputModel);
    updateFunctionSlice('openRemarksModel', openRemarksModel);
    updateFunctionSlice('openSubmitModel', openSubmitModel);
    updateFunctionSlice('closeSubmitModel', closeSubmitModel);
    updateFunctionSlice('openRemedyModel', openRemedyModel);
    updateFunctionSlice('openDocumentModel', openDocumentModel);
    updateFunctionSlice('openPasswordSubmitionModel', openPasswordSubmitionModel);
    updateFunctionSlice('closePasswordSubmitionModel', closePasswordSubmitionModel);
    updateFunctionSlice('openFilePasswordSubmitionModel', openFilePasswordSubmitionModel);
    updateFunctionSlice('closeFilePasswordSubmitionModel', closeFilePasswordSubmitionModel);
    updateFunctionSlice('closeUploadedDocumentModal', closeUploadedDocumentModal);
    updateFunctionSlice('openUploadedDocumentModal', openUploadedDocumentModal);
  }, [
    functionSlice.length,
    dispatch,
    openConfirmationModel,
    openConfirmationYesNoModal,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openConsentModal,
    closeConsentModal,
    closeLicenseModal,
    openLicenseModal,
    openInfoModel,
    closeInfoModel,
    openViewModel,
    openVerify,
    openPassbookViewModel,
    closePassbookViewModel,
    openEmploymentViewModel,
    closeEmploymentViewModel,
    openUserViewModel,
    openOtpForm,
    closeOtpForm,
    openRemarksInputModel,
    closeRemarksInputModel,
    openRemarksModel,
    openSubmitModel,
    closeSubmitModel,
    openRemedyModel,
    openDocumentModel,
    openPasswordSubmitionModel,
    closePasswordSubmitionModel,
    openFilePasswordSubmitionModel,
    closeFilePasswordSubmitionModel,
    closeUploadedDocumentModal,
    openUploadedDocumentModal,
  ]);
  useEffect(() => {
    if (pathname === toLogin || pathname === toUserLogin) {
      closeConfirmationModel();
      closeConfirmationYesNoModel();
      closeOtpSubmitionModel();
      closeViewModel();
      closeVerify();
      closePassbookViewModel();
      closeEmploymentViewModel();
      closeUserViewModel();
      closeOtpForm();
      closeRemarksInputModel();
      closeRemarksModel();
      closeSubmitModel();
      closeRemedyModel();
      closeDocumentModel();
      closePasswordSubmitionModel();
      closeFilePasswordSubmitionModel();
      closeUploadedDocumentModal();
      closeConsentModal();
      closeInfoModel();
      closeLicenseModal();
    }
  }, [pathname]);
  return (
    <>
      <ConfirmationModel
        open={modalState.confirmationOpen}
        confirmationModelContent={confirmationModelContent}
      />
      <ConfirmationYesNoModal
        open={modalState.confirmationYesNoOpen}
        confirmationYesNoModelContent={confirmationYesNoModelContent}
        handleClose={closeConfirmationYesNoModel}
      />
      <OtpSubmitionForm
        open={modalState.otpSubmitionModalOpen}
        otpSubmitionProps={otpSubmitionProps}
        closeOtpSubmitionModel={closeOtpSubmitionModel}
      />
      <ConsentModal open={modalState.consentModalOpen} consentModalContent={consentModalContent} />
      <LicenceModal open={modalState.licenceModalOpen} licenceModalContent={licenceModalContent} />
      <InfoModel open={modalState.infoModelOpen} confirmationModalContent={infoModalContent} />
      <AppointeeView
        openView={modalState.appointeeViewModalOpen}
        openViewModel={openViewModel}
        appointeeId={appointeeId}
        closeViewModel={closeViewModel}
      />
      <ManualverifidView
        openViewModel={openVerify}
        appointeePersonalDetails={appointeePersonalDetails}
        closeViewModel={closeVerify}
        openView={modalState.manualVerifyModalOpen}
      />
      <PassbookView
        openViewModel={openPassbookViewModel}
        appointeeId={appointeeId}
        passbookDetails={passbookDetails}
        closeViewModel={closePassbookViewModel}
        openView={modalState.passbookViewModalOpen}
      />
      <EmploymentView
        openViewModel={openEmploymentViewModel}
        appointeeId={appointeeId}
        userId={userId}
        epfoDetails={epfoDetails}
        closeViewModel={closeEmploymentViewModel}
        openView={modalState.employmentModalViewOpen}
      />
      <UserView
        userId={userId}
        closeViewModel={closeUserViewModel}
        openView={modalState.userViewModalOpen}
      />
      <OtpGenerationForm
        closeOtpForm={closeOtpForm}
        open={modalState.otpFormModalOpen}
        generateOtpProps={generateOtpProps}
      />
      <RemarksInputModel
        open={modalState.remarksInputViewModdalOpen}
        remarksInputModelProps={remarksInputModelProps}
        closeRemarksInputModel={closeRemarksInputModel}
      />
      <RemarksTable
        open={modalState.remarksModelOpen}
        remarksModelProps={remarksModelProps}
        closeRemarksModel={closeRemarksModel}
      />
      <SubmitModal
        openModal={modalState.submitModelOpen}
        submitmodalprops={submitModelProps}
        closeModel={closeSubmitModel}
      />
      <IssueRemedy
        open={modalState.remedyModalOpen}
        remedyModelProps={remedyModelProps}
        closeRemedyModel={closeRemedyModel}
      />
      <DocumentView
        open={modalState.documentModelOpen}
        documentModelProps={documentModelProps}
        closeDocumentModel={closeDocumentModel}
      />
      <ProfilePasswordForm
        open={modalState.passwordSubmitionModelOpen}
        passwordSubmitionProps={passwordSubmitionProps}
        closePasswordSubmitionModel={closePasswordSubmitionModel}
      />
      <FilePasswordForm
        open={modalState.filePasswordSubmitionModelOpen}
        filePasswordSubmitionProps={filePasswordSubmitionProps}
        closeFilePasswordSubmitionModel={closeFilePasswordSubmitionModel}
      />
      <UploadedDocumentView
        open={uploadedDocumentModelOpen}
        documentModelProps={uploadedDocumentModelProps}
        closeDocumentModel={closeUploadedDocumentModal}
      />
    </>
  );
};
export default Modals;
