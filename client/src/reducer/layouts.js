import {
  HIDE_CHAT_SMALL_SCREEN,
  SHOW_CHAT_SMALL_SCREEN,
} from '../actions/actionTypes';

export const layouts = (state = {}, { type, payload }) => {
  switch (type) {
    case SHOW_CHAT_SMALL_SCREEN:
      return {
        ...state,
        chatOnSmallScreen: true,
      };
    case HIDE_CHAT_SMALL_SCREEN:
      return {
        ...state,
        chatOnSmallScreen: false,
      };

    default:
      return state;
  }
};
