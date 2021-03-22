import { combineReducers } from 'redux';
import {
  userLogin,
  addFriend,
  friends,
  activeUser,
  userRegister,
  updateUser,
  removeFriend,
} from './user';
import { layouts } from './layouts';
import { getGroups, activeGroup } from './groups';

export default combineReducers({
  getGroups,
  layouts,
  updateUser,
  userRegister,
  userLogin,
  addFriend,
  removeFriend,
  friends,
  activeUser,
  activeGroup,
});
