import socket from '../utils/socket';
import {
  ADD_FRIEND_REQUIES,
  ADD_FRINED_FAIL,
  ADD_FRINED_SUCCESS,
  GET_FRIEND_REQUIES,
  GET_FRINED_FAIL,
  GET_FRINED_SUCCESS,
  REMOVE_FRIEND_FAIL,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND_SUCCESS,
  SET_ACTIVE_USER,
  UPDATA_PROFILE_PHOTO,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUIES,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUIES,
  USER_REGISTER_SUCCESS,
} from './actionTypes';
export const userLogin = (email, password) => dispatch => {
  dispatch({ type: USER_LOGIN_REQUIES });
  socket.emit('login', { email, password });

  socket.on('loginResponse', response => {
    if (response.success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.user });
      // localStorage.setItem('userInfo', JSON.stringify(response.user));
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: response.error });
    }
  });
};
export const userLogout = () => dispatch => {
  dispatch({ type: USER_LOGOUT });
  // reset user login
  dispatch({ type: USER_LOGIN_SUCCESS, payload: {} });
  // reset user regster
  dispatch({ type: USER_REGISTER_SUCCESS, payload: {} });
  localStorage.removeItem('userInfo');
};
export const userRegister = (username, email, password) => dispatch => {
  dispatch({ type: USER_REGISTER_REQUIES });
  socket.emit('register', { username, email, password });

  socket.on('registerResponse', response => {
    if (response.success) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.user });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.user });
    } else {
      dispatch({ type: USER_REGISTER_FAIL, payload: response.error });
    }
  });
};
export const addFriend = friendId => (dispatch, getState) => {
  dispatch({ type: ADD_FRIEND_REQUIES });
  const { userId } = getState().userLogin.user;
  socket.emit('addFriend', { friendId, userId });

  socket.on('addFriendResponse', response => {
    if (response.success) {
      dispatch({ type: ADD_FRINED_SUCCESS, payload: true });
    } else {
      dispatch({ type: ADD_FRINED_FAIL, payload: response.error });
    }
  });
};
export const removeFriend = friendId => (dispatch, getState) => {
  dispatch({ type: REMOVE_FRIEND_REQUEST });
  const { userId } = getState().userLogin.user;
  socket.emit('removeFriend', { friendId, userId });

  socket.on('removeFriendResponse', response => {
    console.log(response);
    if (response.success) {
      dispatch({ type: REMOVE_FRIEND_SUCCESS });
    } else {
      dispatch({ type: REMOVE_FRIEND_FAIL, payload: response.error });
    }
  });
};
export const getFriends = () => (dispatch, getState) => {
  dispatch({ type: GET_FRIEND_REQUIES });
  const { userId } = getState().userLogin.user;
  socket.emit('getFriends', userId);

  socket.on('getFriendsResponse', response => {
    if (response.success) {
      dispatch({ type: GET_FRINED_SUCCESS, payload: response.friends });
    } else {
      dispatch({ type: GET_FRINED_FAIL, payload: response.error });
    }
  });
};

export const setActiveUser = (friendId, room) => (dispatch, getState) => {
  const { userId } = getState().userLogin.user;
  socket.emit('joinRoom', { room, friendId, userId });
  dispatch({ type: SET_ACTIVE_USER, payload: friendId });
};

export const changeProfilePicture = filePath => async dispatch => {
  dispatch({
    type: UPDATA_PROFILE_PHOTO,
    payload: filePath,
  });
};

export const getUserById = userId => dispatch => {
  socket.emit('getUserById', userId);

  socket.on('getUserByIdResponse', response => {
    if (response.success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.user });
      // localStorage.setItem('userInfo', JSON.stringify(response.user));
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: response.error });
    }
  });
};

export const updateuser = data => (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  const {
    user: { userId },
  } = getState().userLogin;
  socket.emit('updateUser', { userId, data });
  socket.on('updateUserResponse', response => {
    console.log(response);
    if (response.success) {
      dispatch({ type: UPDATE_USER_SUCCESS });
      // localStorage.setItem('userInfo', JSON.stringify(response.user));
      // login in the user
      dispatch(getUserById(userId));
    } else {
      dispatch({ type: UPDATE_USER_FAIL, payload: response.error });
    }
  });
};
