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
  SEARCH_FRIENDS,
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
} from '../actions/actionTypes';

export const userLogin = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUIES:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case UPDATA_PROFILE_PHOTO:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload,
        },
      };
    case USER_LOGOUT:
      return {
        user: {},
      };
    default:
      return state;
  }
};
export const userRegister = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUIES:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export const addFriend = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_FRIEND_REQUIES:
      return {
        loading: true,
      };
    case ADD_FRINED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_FRINED_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export const friends = (state = { friends: [] }, { type, payload }) => {
  switch (type) {
    case GET_FRIEND_REQUIES:
      return {
        ...state,
        loading: true,
      };
    case GET_FRINED_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: payload,
      };
    case GET_FRINED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_FRIENDS:
      let friends = state.friends.filter(({ user, messages }) => {
        const { username, email } = user;
        if (payload.test(username) || payload.test(email)) {
          return user;
        }

        for (let i = 0; i < messages.length; i++) {
          let message = messages[i];

          if (payload.test(message.text)) {
            return user;
          }
        }
      });
      return {
        ...state,
        friends,
      };
    default:
      return state;
  }
};

export const activeUser = (state = '', { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_USER:
      return payload;

    default:
      return state;
  }
};

export const updateUser = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
export const removeFriend = (state = {}, { type, payload }) => {
  switch (type) {
    case REMOVE_FRIEND_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_FRIEND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_FRIEND_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
