import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dialogsActions from '../../../store/actions/ui/dialogs';

import Dialog from './Dialog';

function ConfirmationDialog() {
  const dispatch = useDispatch();
  const dialogState = useSelector((state) => state.ui.dialog);

  const onClose = () => {
    dispatch(dialogsActions.closeDialog());
  };

  return (
    <Dialog
      shown={dialogState?.shown}
      title={dialogState?.title}
      message={dialogState?.message}
      onSuccess={dialogState?.onSuccess}
      onClose={onClose}
    />
  );
}

export default ConfirmationDialog;
