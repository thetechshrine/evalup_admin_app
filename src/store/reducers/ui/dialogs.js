import { SHOW_CONFIRMATION_DIALOG, CLOSE_DIALOG } from '../../types/ui/dialogs';

const dialogTypes = Object.freeze({
  CONFIRMATION: 'CONFIRMATION'
});

function initState() {
  return {
    shown: false,
    type: null,
    title: null,
    message: null,
    onSuccess: null
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case SHOW_CONFIRMATION_DIALOG:
      return {
        shown: true,
        type: dialogTypes.CONFIRMATION,
        title: action.payload.title,
        message: action.payload.message,
        onSuccess: action.payload.onConfirm
      };

    case CLOSE_DIALOG:
      return initState();

    default:
      return state;
  }
}
