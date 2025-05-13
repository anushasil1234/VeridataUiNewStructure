export const policySetupStyle = {
  container: {
    p: 3,
  },
  paper: {
    p: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    mb: 3,
  },
  policyInfo: {
    mb: 3,
    p: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 1,
  },
  stepper: {
    mt: 2,
  },
  processContainer: {
    mt: 2,
    p: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    border: '1px solid #e0e0e0',
  },
  processHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  },
  processControls: {
    mt: 2,
    p: 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 1,
  },
  disabledProcess: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  requiredBadge: {
    ml: 1,
    px: 1,
    py: 0.5,
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: 1,
    fontSize: '0.75rem',
  },
  datePickerContainer: {
    mt: 2,
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
};

export const policyStageStyle = {
  container: {
    marginTop: 2,
  },
  stageHeader: {
    marginBottom: 2,
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: 1,
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControlLabel-root': {
      margin: 0,
      '& .MuiTypography-root': {
        fontSize: '1.1rem',
        fontWeight: 500,
      },
    },
  },
  processContainer: {
    margin: '12px 0',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    border: '1px solid #e0e0e0',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
  },
  indent: {
    width: '24px',
    borderLeft: '2px solid #e0e0e0',
    marginRight: 2,
  },
  processContent: {
    flex: 1,
  },
  processHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
    '& .MuiFormControlLabel-root': {
      margin: 0,
      '& .MuiTypography-root': {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    '& .MuiChip-root': {
      height: '24px',
      '& .MuiChip-label': {
        fontSize: '0.75rem',
        padding: '0 8px',
      },
    },
  },
  processControls: {
    marginTop: 2,
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: 1,
    '& .MuiFormControlLabel-root': {
      marginRight: 3,
      '& .MuiTypography-root': {
        fontSize: '0.9rem',
      },
    },
    '& .MuiSwitch-root': {
      marginRight: 1,
    },
  },
  processStatus: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    '& .MuiChip-root': {
      margin: '0 4px 4px 0',
    },
  },
  disabledProcess: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  requiredBadge: {
    marginLeft: 1,
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 500,
  },
}; 