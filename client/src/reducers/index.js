import { combineReducers } from 'redux';
import {
  postCommentCreateReducer,
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postFollowReducer,
  postLikeReducer,
  postListReducer,
  postReviewCreateReducer,
  postUpdateReducer,
} from './postReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateInfoReducer,
} from './authReducers';
import {
  profileCreateReducer,
  profileDetailsReducer,
  profileListReducer,
  profileUpdateReducer,
} from './profileReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateInfo: userUpdateInfoReducer,

  profileCreate: profileCreateReducer,
  profileDetails: profileDetailsReducer,
  profileUpdate: profileUpdateReducer,
  profileList: profileListReducer,

  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCommentCreate: postCommentCreateReducer,
  postReviewCreate: postReviewCreateReducer,
  postLikes: postLikeReducer,
  postFollows: postFollowReducer,
});
