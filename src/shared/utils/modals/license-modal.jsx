import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import Button1 from '../button/button1';
import HtmlParser from 'shared/components/html-template-parse/html-parser';
import { useSelector } from 'react-redux';

const LicenceModal = ({ open, licenceModalContent }) => {
  const {
    dialogTitle,
    confirmedYes,
    confirmedNo,
    firstButtonName = 'Agree',
    secondButtonName = 'Disagree',
    liceseCallBack,
    closeLicenseModal
  } = licenceModalContent || {};
   const loggedInData = useSelector(state => state.loggedInData)
   const userTypeId = loggedInData?.[0]?.userTypeId;
  const licenceType = userTypeId === 1 || userTypeId === 2 ? 'ADMELUA' : 'CADELUA';

  const data = { name: 'John Doe' };
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const element = contentRef.current;
    if (element) {
      const isAtBottom =
        element.scrollHeight - element.scrollTop <= element.clientHeight + 5;
      setScrolledToBottom(isAtBottom);
    }
  };

  const handleAgree = () => {
    if (confirmedYes) confirmedYes();
    if (liceseCallBack) liceseCallBack('yes');
    if (closeLicenseModal) closeLicenseModal();
  };

  const handleDisagree = () => {
    if (confirmedNo) confirmedNo();
    if (liceseCallBack) liceseCallBack('no');
    if (closeLicenseModal) closeLicenseModal();
  };

  useEffect(() => {
    if (!open) {
      setScrolledToBottom(false);
    }
  }, [open]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <div
          ref={contentRef}
          onScroll={handleScroll}
          style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}
        >
          <HtmlParser data={data} type={licenceType} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button1 onClick={handleAgree} disabled={!scrolledToBottom}>
          {firstButtonName}
        </Button1>
        <Button1 onClick={handleDisagree} disabled={!scrolledToBottom}>
          {secondButtonName}
        </Button1>
      </DialogActions>
    </Dialog>
  );
};

export default LicenceModal;
