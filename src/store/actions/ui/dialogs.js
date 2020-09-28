import { SHOW_CONFIRMATION_DIALOG, CLOSE_DIALOG } from '../../types/ui/dialogs';

function showConfirmationDialog({ title, message, onConfirm } = {}) {
  return {
    type: SHOW_CONFIRMATION_DIALOG,
    payload: { title, message, onConfirm }
  };
}

function closeDialog() {
  return { type: CLOSE_DIALOG };
}

export default {
  showConfirmationDialog,
  closeDialog
};
