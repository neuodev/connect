import socket from '../utils/socket';
import {
  GET_GROUPS_FAIL,
  GET_GROUPS_REQUIES,
  GET_GROUPS_SUCCESS,
} from './actionTypes';

export const getGroups = () => (dispatch, getState) => {
  dispatch({ type: GET_GROUPS_REQUIES });
  const { user } = getState().userLogin;
  socket.emit('getGroups', user.userId);
  socket.on('getGroupsResponse', res => {
    if (res.error) {
      dispatch({ type: GET_GROUPS_FAIL, payload: res.error });
    } else {
      dispatch({ type: GET_GROUPS_SUCCESS, payload: res });
    }
  });
};
