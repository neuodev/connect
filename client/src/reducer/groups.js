import {
  GET_GROUPS_REQUIES,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  SET_ACTIVE_GROUP,
  SEARCH_GROUPS,
} from '../actions/actionTypes';

export const getGroups = (state = { groups: [] }, { type, payload }) => {
  switch (type) {
    case GET_GROUPS_REQUIES:
      return {
        ...state,
        loading: true,
      };
    case GET_GROUPS_SUCCESS:
      return {
        loading: false,
        groups: payload,
      };
    case GET_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_GROUPS:
      let groups = state.groups.filter(group => {
        const { groupName, members, messages } = group;

        if (payload.test(groupName)) {
          return group;
        }
        for (let i = 0; i < messages.length; i++) {
          let message = messages[i];
          if (payload.test(message.text)) {
            return group;
          }
        }
        for (let i = 0; i < members.length; i++) {
          let member = members[i];
          if (payload.test(member.member.username)) {
            return group;
          }
        }
      });
      return {
        ...state,
        groups,
      };
    default:
      return state;
  }
};

export const activeGroup = (state = '', { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_GROUP:
      return payload;

    default:
      return state;
  }
};
