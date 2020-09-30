import { SHOW_LOADING, CLOSE_LOADING } from '../../types/ui/loading';

function initState() {
  return {
    shown: false
  };
}

export default function (state = initState(), action) {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        shown: true
      };

    case CLOSE_LOADING:
      return {
        shown: false
      };

    default:
      return state;
  }
}
