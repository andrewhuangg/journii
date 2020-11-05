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
  postCommentCreate: postCommentCreateReducer,
  postReviewCreate: postReviewCreateReducer,
  postLikes: postLikeReducer,
  postFollows: postFollowReducer,
});
