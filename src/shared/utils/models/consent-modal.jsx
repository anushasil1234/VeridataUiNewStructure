import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button1 from '../button/button1';
import { useSelector } from "react-redux";
import { setLocalStorageItem } from "shared/utils";
import { useDispatch } from "react-redux";
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";
import HtmlParser from 'shared/components/html-template-parse/html-parser';

const ConsentModal = ({ open, consentModalContent }) => {
  const dispatch = useDispatch();
  const loggedInData = useSelector(state => state.loggedInData)
  const apiSlice = useSelector(state => state.apiSlice);

  const { postAppointeeConsent } = apiSlice[0];
  const userDetails = loggedInData[0];

  const appointeeId = userDetails?.appointeeId;
  const userId = userDetails?.userId;
  const consentStatus = userDetails?.consentStatus;
  const [isConsentProcessed, setIsConsentProcessed] = useState(userDetails?.isConsentProcessed)

  const { dialogTitle, dialogComponent, dialogContentText, closeConsentModal, consentCallBack } = consentModalContent || "";

  const data = { name: 'John Doe' };

  const submitConsentStatus = async (consentStatusId, consentStatusCode) => {
    const postConsentpayLoad = {
      appointeeId: appointeeId,
      ConsentStatus: consentStatusId,
      ConsentStatusCode: consentStatusCode,
      userId: userId
    }
    const response = await postAppointeeConsent(postConsentpayLoad);
    setIsConsentProcessed(consentStatusCode === 'CNSTDCLN' ? false : true);
    if (response) {
      const { responseInfo } = response;
      if (responseInfo === 'success') {
        setLocalStorageItem("pfc-user", {
          ...userDetails,
          consentStatus: consentStatusId,
          isConsentProcessed: isConsentProcessed,
        });
        dispatch(removeLoggedinData());
        // userDetails.consentStatus = consentStatusId;
        dispatch(storeLoggedinData({
          ...userDetails,
          consentStatus: consentStatusId,
          isConsentProcessed: isConsentProcessed,
        }));

        (consentCallBack && consentStatusId !== 2) && consentCallBack();
        closeConsentModal();
      }
    }

  }

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {/* {
          dialogContentText &&
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
        } */}
        <div>
          <HtmlParser data={data} type={"Consetnt"} />
        </div>
      </DialogContent>
      <DialogActions>
        {consentStatus !== 1 ?
          <>
            <Button1 onClick={() => submitConsentStatus(1, 'CNSTGVN')}>
              Agree
            </Button1>
            {isConsentProcessed !== true &&
              <Button1 onClick={() => submitConsentStatus(2, 'CNSTDCLN')}>
                Disagree
              </Button1>
            }
          </>
          : null
        }
        {consentStatus === 1 ?
          <Button1 onClick={() => submitConsentStatus(3, 'CNSTRVK')}>
            Revoke
          </Button1>
          : null
        }
        <Button1 onClick={closeConsentModal}>
          Close
        </Button1>
      </DialogActions>
    </Dialog>
  )
}

export default ConsentModal