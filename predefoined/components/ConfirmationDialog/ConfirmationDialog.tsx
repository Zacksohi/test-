import React from 'react';
import './ConfirmationDialog.css';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <div className="dialog-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="dialog-body">
          <p>{message}</p>
        </div>
        <div className="dialog-footer">
          <button className="cancel-btn" onClick={onCancel}>
            No, Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
