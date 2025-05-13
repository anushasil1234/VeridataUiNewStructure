import React from 'react';
import { Stack } from '@mui/system';
import { FabIcon } from 'shared/utils';
import { floatingIconListStyle, actionIconListStyle } from 'app';
import { hasValue } from 'shared/utils';

const ActionButtons = React.memo(({ 
  appointeeStatus, 
  actionIconListDisplay, 
  isProcessed, 
  isSaveStep, 
  hasPermission, 
  uanNumber,
  degreeOfRotation,
  handleToggleActionList,
  handleApprove,
  handleReject,
  handleRprocess,
  handleClickOnReview,
  handlePassbookView,
  handleServiceHistoryView,
  fabProps
}) => {
  const renderActionButtons = () => {
    if (appointeeStatus === 'P' || appointeeStatus === 'R') {
      return (
        <FabIcon
          props={{
            ...fabProps.remarks,
            selectedIndex: 1,
            index: 1,
            placement: 'left-end',
            size: 'small',
          }}
        />
      );
    }

    const actionButtons = [];

    if (isProcessed !== true) {
      if (isSaveStep && isSaveStep > 0 && hasPermission?.['A002']) {
        actionButtons.push(
          <FabIcon
            key="approve"
            props={{
              ...fabProps.approve,
              selectedIndex: 1,
              index: 1,
              placement: 'left-end',
              size: 'small',
            }}
          />
        );
      }

      if (hasPermission?.['A003']) {
        actionButtons.push(
          <FabIcon
            key="reject"
            props={{
              ...fabProps.reject,
              selectedIndex: 1,
              index: 1,
              placement: 'left-end',
              size: 'small',
            }}
          />
        );
      }

      if (hasPermission?.['A010']) {
        actionButtons.push(
          <FabIcon
            key="reprocess"
            props={{
              ...fabProps.reprocess,
              selectedIndex: 3,
              index: 3,
            }}
          />
        );
      }

      if (hasValue(uanNumber)) {
        actionButtons.push(
          <FabIcon
            key="viewPassbook"
            props={{
              ...fabProps.viewPassbook,
              selectedIndex: 3,
              index: 3,
            }}
          />
        );
        actionButtons.push(
          <FabIcon
            key="viewServiceHist"
            props={{
              ...fabProps.viewServiceHist,
              selectedIndex: 3,
              index: 3,
            }}
          />
        );
      }
    }

    actionButtons.push(
      <FabIcon 
        key="remarks"
        props={{ 
          ...fabProps.remarks, 
          selectedIndex: 4, 
          index: 4 
        }} 
      />
    );

    return (
      <>
        <FabIcon 
          props={{ 
            ...fabProps.add, 
            selectedIndex: 1, 
            index: 1,
            handleClick: handleToggleActionList
          }} 
        />
        {actionIconListDisplay && (
          <Stack sx={actionIconListStyle}>
            {actionButtons}
          </Stack>
        )}
      </>
    );
  };

  return (
    <Stack sx={floatingIconListStyle}>
      {renderActionButtons()}
    </Stack>
  );
});

export default ActionButtons; 