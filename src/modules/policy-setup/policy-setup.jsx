import React from 'react';
import { Box, Typography, Paper, Stepper, Step, StepLabel, Button, Stack } from '@mui/material';
import { usePolicySetupLogic } from './use-policy-setup-logic';
import { PolicyStage } from './components/policy-stage';
import { policySetupStyle } from './policy-setup-style';
import CustomeDatePicker from 'shared/components/input-fields/custome-date-picker';
import dayjs from 'dayjs';

const PolicySetup = () => {
  const {
    activePolicy,
    loading,
    error,
    handleEditPolicy,
    handleSavePolicy,
    handleCancelEdit,
    handleProcessChange,
    isEditing,
    editedPolicy,
    handleEffectiveDateChange
  } = usePolicySetupLogic();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!activePolicy) {
    return <Typography>No active policy found</Typography>;
  }

  return (
    <Box sx={policySetupStyle.container}>
      <Paper sx={policySetupStyle.paper}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={policySetupStyle.header}>
          <Typography variant="h5" component="h1">
            Verification Policy Setup
          </Typography>
          <Stack direction="row" spacing={2}>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditPolicy}
              >
                Edit Policy
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSavePolicy}
                >
                  Save Changes
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        {activePolicy && (
          <>
            <Box sx={policySetupStyle.policyInfo}>
              <Typography variant="h6">
                {activePolicy.workflowName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Effective Date: {new Date(activePolicy.effectiveDate).toLocaleDateString()}
              </Typography>
              {isEditing && (
                <Box sx={{ mt: 2 }}>
                  <CustomeDatePicker
                    label="Effective Date"
                    value={editedPolicy?.effectiveDate ? dayjs(editedPolicy.effectiveDate) : null}
                    name="effectiveDate"
                    setValue={handleEffectiveDateChange}
                    required={true}
                    minDate={dayjs()}
                    maxDate={null}
                  />
                </Box>
              )}
            </Box>

            <Stepper orientation="vertical" sx={policySetupStyle.stepper}>
              {activePolicy.stages?.map((stage) => (
                <Step key={stage.stageId} active={true}>
                  <StepLabel>
                    <Typography variant="subtitle1">
                      Stage {stage.stageStep + 1}
                      {stage.isRequired && ' (Required)'}
                    </Typography>
                  </StepLabel>
                  <PolicyStage
                    stage={stage}
                    isEditing={isEditing}
                    handleProcessChange={handleProcessChange}
                  />
                </Step>
              ))}
            </Stepper>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PolicySetup; 