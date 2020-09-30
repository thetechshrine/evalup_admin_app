import { SHOW_LOADING, CLOSE_LOADING } from '../../types/ui/loading';

function showLoading() {
  return { type: SHOW_LOADING };
}

function closeLoading() {
  return { type: CLOSE_LOADING };
}

export default {
  showLoading,
  closeLoading
};
