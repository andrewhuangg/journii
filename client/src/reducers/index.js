import { combineReducers } from 'redux';
import {
  postListReducer,
  postListOwnReducer,
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
import { quoteListReducer } from './quoteReducer';

export default combineReducers({
  quoteList: quoteListReducer,

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
  postOwnList: postListOwnReducer,
  postDetails: postDetailsReducer,
  postComment: postCommentReducer,
  postReview: postReviewReducer,
  postTopRated: postTopRatedReducer,
  postLatest: postLatestReducer,
  postListFollowing: postListFollowingReducer,
  postListLiked: postListLikedReducer,
});
