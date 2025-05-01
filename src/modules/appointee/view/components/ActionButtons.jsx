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
  return (
    <Stack sx={floatingIconListStyle}>
      {appointeeStatus === 'P' || appointeeStatus === 'R' ? (
        <FabIcon
          props={{
            ...fabProps.remarks,
            selectedIndex: 1,
            index: 1,
            placement: 'left-end',
            size: 'small',
          }}
        />
      ) : (
        <>
          <FabIcon props={{ ...fabProps.add, selectedIndex: 1, index: 1 }} />
          {actionIconListDisplay && (
            <Stack sx={{ ...actionIconListStyle }}>
              {isProcessed !== true && (
                <>
                  {isSaveStep && isSaveStep > 0 && hasPermission?.['A002'] && (
                    <FabIcon
                      props={{
                        ...fabProps.approve,
                        selectedIndex: 1,
                        index: 1,
                        placement: 'left-end',
                        size: 'small',
                      }}
                    />
                  )}
                  {hasPermission?.['A003'] && (
                    <FabIcon
                      props={{
                        ...fabProps.reject,
                        selectedIndex: 1,
                        index: 1,
                        placement: 'left-end',
                        size: 'small',
                      }}
                    />
                  )}
                  {hasPermission?.['A010'] && (
                    <FabIcon
                      props={{
                        ...fabProps.reprocess,
                        selectedIndex: 3,
                        index: 3,
                      }}
                    />
                  )}
                  {hasValue(uanNumber) && (
                    <>
                      <FabIcon
                        props={{
                          ...fabProps.viewPassbook,
                          selectedIndex: 3,
                          index: 3,
                        }}
                      />
                      <FabIcon
                        props={{
                          ...fabProps.viewServiceHist,
                          selectedIndex: 3,
                          index: 3,
                        }}
                      />
                    </>
                  )}
                </>
              )}
              <FabIcon props={{ ...fabProps.remarks, selectedIndex: 4, index: 4 }} />
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
});

export default ActionButtons; 