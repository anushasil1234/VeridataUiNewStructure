import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getCurrentPolicyDetails,postNewWorkflowPolicy } from 'server/apis';
import dayjs from 'dayjs';

export const usePolicySetupLogic = () => {
  const [activePolicy, setActivePolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPolicy, setEditedPolicy] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchActivePolicy();
  }, []);

  const fetchActivePolicy = async () => {
    try {
      setLoading(true);
      const response = await getCurrentPolicyDetails();
      if (response) {
        const { responseInfo, statusCode } = response;
        setActivePolicy(responseInfo);
        setEditedPolicy(responseInfo);
      } else {
        throw new Error('Failed to fetch policy');
      }
    } catch (err) {
      setError(err.message);
      enqueueSnackbar('Failed to fetch policy', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditPolicy = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPolicy(activePolicy);
  };

  const formatPolicyPayload = (policy) => {
    const details = [];
    
    policy.stages.forEach(stage => {
      stage.processes.forEach(process => {
        const isProcessEnabled = process.isAutomated || process.isManual || process.isOptional || process.applyManualOnAutofail;
        
        details.push({
          stageId: stage.stageId,
          processId: process.processId,
          isAutomated: process.isAutomated,
          isManual: process.isManual,
          isOptional: process.isOptional,
          applyManualOnAutofail: process.applyManualOnAutofail,
          activeStatus: isProcessEnabled
        });
      });
    });

    return {
      workflowName: policy.workflowName,
      isPublished: true,
      createdBy: policy.createdBy || 0,
      details: details
    };
  };

  const handleSavePolicy = async () => {
    try {
      // Validate effective date
      if (!editedPolicy.effectiveDate) {
        enqueueSnackbar('Effective date is required', { variant: 'error' });
        return;
      }

      const effectiveDate = dayjs(editedPolicy.effectiveDate);
      if (effectiveDate.isBefore(dayjs(), 'day')) {
        enqueueSnackbar('Effective date cannot be in the past', { variant: 'error' });
        return;
      }

      const payload = formatPolicyPayload(editedPolicy);
      const response = await postNewWorkflowPolicy(payload);

      if (response.data && response.data.statusCode === 200) {
        setActivePolicy(editedPolicy);
        setIsEditing(false);
        enqueueSnackbar('Policy updated successfully', { variant: 'success' });
      } else {
        throw new Error(response.data?.errorResponse || 'Failed to update policy');
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleProcessChange = (stageId, processId, field, value) => {
    setEditedPolicy(prev => {
      const newPolicy = { ...prev };
      const stage = newPolicy.stages.find(s => s.stageId === stageId);
      if (stage) {
        const process = stage.processes.find(p => p.processId === processId);
        if (process) {
          process[field] = value;
        }
      }
      return newPolicy;
    });
  };

  const handleEffectiveDateChange = (date) => {
    setEditedPolicy(prev => ({
      ...prev,
      effectiveDate: date ? date.toISOString() : null
    }));
  };

  return {
    activePolicy,
    loading,
    error,
    isEditing,
    editedPolicy,
    handleEditPolicy,
    handleSavePolicy,
    handleCancelEdit,
    handleProcessChange,
    handleEffectiveDateChange
  };
}; 