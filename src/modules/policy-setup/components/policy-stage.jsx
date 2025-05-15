import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Switch, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { policyStageStyle } from '../policy-setup-style';

export const PolicyStage = ({ stage, isEditing, handleProcessChange }) => {
  const isStageEditable = !stage.isRequired;
  const [originalProcessValues, setOriginalProcessValues] = useState({});

  // Store original values when component mounts or stage changes
  useEffect(() => {
    const initialValues = {};
    stage.processes.forEach(process => {
      initialValues[process.processId] = {
        isAutomated: process.isAutomated,
        isManual: process.isManual,
        isOptional: process.isOptional,
        applyManualOnAutofail: process.applyManualOnAutofail
      };
    });
    setOriginalProcessValues(initialValues);
  }, [stage]);

  const handleStageCheckboxChange = (checked) => {
    if (checked) {
      // Restore original state for all processes in the stage
      stage.processes.forEach(process => {
        const originalValues = originalProcessValues[process.processId];
        if (originalValues) {
          handleProcessChange(stage.stageId, process.processId, 'isAutomated', originalValues.isAutomated);
          handleProcessChange(stage.stageId, process.processId, 'isManual', originalValues.isManual);
          handleProcessChange(stage.stageId, process.processId, 'isOptional', originalValues.isOptional);
          handleProcessChange(stage.stageId, process.processId, 'applyManualOnAutofail', originalValues.applyManualOnAutofail);
        }
      });
    } else {
      // Disable all processes in the stage
      stage.processes.forEach(process => {
        handleProcessChange(stage.stageId, process.processId, 'isAutomated', false);
        handleProcessChange(stage.stageId, process.processId, 'isManual', false);
        handleProcessChange(stage.stageId, process.processId, 'isOptional', false);
        handleProcessChange(stage.stageId, process.processId, 'applyManualOnAutofail', false);
      });
    }
  };

  const handleProcessCheckboxChange = (process, checked) => {
    if (checked) {
      // Restore original state for the process
      const originalValues = originalProcessValues[process.processId];
      if (originalValues) {
        handleProcessChange(stage.stageId, process.processId, 'isAutomated', originalValues.isAutomated);
        handleProcessChange(stage.stageId, process.processId, 'isManual', originalValues.isManual);
        handleProcessChange(stage.stageId, process.processId, 'isOptional', originalValues.isOptional);
        handleProcessChange(stage.stageId, process.processId, 'applyManualOnAutofail', originalValues.applyManualOnAutofail);
      }
    } else {
      // Disable all options for the process
      handleProcessChange(stage.stageId, process.processId, 'isAutomated', false);
      handleProcessChange(stage.stageId, process.processId, 'isManual', false);
      handleProcessChange(stage.stageId, process.processId, 'isOptional', false);
      handleProcessChange(stage.stageId, process.processId, 'applyManualOnAutofail', false);
    }
  };

  // const isStageEnabled = stage.processes.some(process => 
  //   process.isAutomated || process.isManual || process.isOptional || process.applyManualOnAutofail
  // );  
  const isStageEnabled = stage.isActive;

  const renderStatusBadges = (process) => (
    <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
      {process.isAutomated && (
        <Chip 
          label="Automated" 
          size="small" 
          color="primary" 
          variant="outlined"
          sx={{ height: '24px' }}
        />
      )}
      {process.isManual && (
        <Chip 
          label="Manual" 
          size="small" 
          color="secondary" 
          variant="outlined"
          sx={{ height: '24px' }}
        />
      )}
      {process.isOptional && (
        <Chip 
          label="Optional" 
          size="small" 
          color="info" 
          variant="outlined"
          sx={{ height: '24px' }}
        />
      )}
      {process.applyManualOnAutofail && (
        <Chip 
          label="Manual on Auto-fail" 
          size="small" 
          color="warning" 
          variant="outlined"
          sx={{ height: '24px' }}
        />
      )}
    </Stack>
  );

  return (
    <Box sx={policyStageStyle.container}>
      <Box sx={policyStageStyle.stageHeader}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isStageEnabled}
              onChange={(e) => handleStageCheckboxChange(e.target.checked)}
              disabled={!isEditing || !isStageEditable}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                Stage {stage.stageStep + 1}
              </Typography>
              {stage.isRequired && (
                <Box component="span" sx={policyStageStyle.requiredBadge}>
                  Required
                </Box>
              )}
            </Box>
          }
        />
      </Box>
      {stage.processes.map((process) => {
        const isProcessEnabled =process.activeStatus && (process.isAutomated || process.isManual || process.isOptional || process.applyManualOnAutofail || isStageEnabled);
        
        return (
          <Box 
            key={process.processId} 
            sx={{
              ...policyStageStyle.processContainer,
              ...(!isProcessEnabled && policyStageStyle.disabledProcess)
            }}
          >
            {process.isChild && <Box sx={policyStageStyle.indent} />}
            <Box sx={policyStageStyle.processContent}>
              <Box sx={policyStageStyle.processHeader}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isProcessEnabled}
                        onChange={(e) => handleProcessCheckboxChange(process, e.target.checked)}
                        disabled={!isEditing || !isStageEditable}
                      />
                    }
                    label={process.processName}
                  />
                  {renderStatusBadges(process)}
                </Stack>
              </Box>
              {isEditing && isStageEditable ? (
                <Box sx={policyStageStyle.processControls}>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={process.isAutomated}
                          onChange={(e) => handleProcessChange(stage.stageId, process.processId, 'isAutomated', e.target.checked)}
                          disabled={true}
                        />
                      }
                      label="Automated"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={process.isManual}
                          onChange={(e) => handleProcessChange(stage.stageId, process.processId, 'isManual', e.target.checked)}
                          disabled={true}
                        />
                      }
                      label="Manual"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={process.isOptional}
                          onChange={(e) => handleProcessChange(stage.stageId, process.processId, 'isOptional', e.target.checked)}
                          disabled={true}
                        />
                      }
                      label="Optional"
                    />
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          checked={process.applyManualOnAutofail}
                          onChange={(e) => handleProcessChange(stage.stageId, process.processId, 'applyManualOnAutofail', e.target.checked)}
                          disabled={true}
                        />
                      }
                      label="Apply Manual on Auto-fail"
                    />*/}
                  </Stack> 
                </Box>
              ) : null}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}; 