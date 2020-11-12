import { combineReducers } from 'redux';
import {
  postListReducer,
  postDetailsReducer,
  postCreateReducer,
  postUpdateReducer,
  postDeleteReducer,
  postLikeReducer,
  postFollowReducer,
  postReviewCreateReducer,
  postCommentReducer,
} from './postReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateInfoReducer,
} from './authReducers';
import {
  profileCreateReducer,
  profileDeleteReducer,
  profileDetailsReducer,
  profileExperienceReducer,
  profileFollowReducer,
  profileGithubReducer,
  profileListReducer,
  profileProjectReducer,
  profileUpdateReducer,
} from './profileReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateInfo: userUpdateInfoReducer,

  profileCreate: profileCreateReducer,
  profileUpdate: profileUpdateReducer,
  profileDelete: profileDeleteReducer,
  profileDetails: profileDetailsReducer,
  profileList: profileListReducer,
  profileFollows: profileFollowReducer,
  profileExperience: profileExperienceReducer,
  profileProject: profileProjectReducer,
  profileGithub: profileGithubReducer,

  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postComment: postCommentReducer,
  postReviewCreate: postReviewCreateReducer,
  postLikes: postLikeReducer,
  postFollows: postFollowReducer,
});
