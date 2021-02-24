import { combineReducers } from 'redux';
import {
  postListReducer,
  postDetailsReducer,
  postCreateReducer,
  postUpdateReducer,
  postDeleteReducer,
  postReviewReducer,
  postCommentReducer,
  postTopRatedReducer,
  postLatestReducer,
  postListFollowingReducer,
  postListLikedReducer,
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
  profileGithubReducer,
  profileListReducer,
  profileProjectReducer,
  profileUpdateReducer,
  profileListFollowingReducer,
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
  profileExperience: profileExperienceReducer,
  profileProject: profileProjectReducer,
  profileGithub: profileGithubReducer,
  profileListFollowing: profileListFollowingReducer,

  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postComment: postCommentReducer,
  postReview: postReviewReducer,
  postTopRated: postTopRatedReducer,
  postLatest: postLatestReducer,
  postListFollowing: postListFollowingReducer,
  postListLiked: postListLikedReducer,
});
