import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  blogPosts: initEntityState(null),
  singlePost: initEntityState(null),
  recentPosts: initEntityState(null),
  tags: initEntityState(null),
  comments: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getBlogPosts.request):
      return { ...state, blogPosts: entityLoadingStarted(state.blogPosts, action.payload) };
    case getType(actions.getBlogPosts.success):
      return { ...state, blogPosts: entityLoadingSucceeded(state.blogPosts, action.payload) };
    case getType(actions.getBlogPosts.failure):
      return { ...state, blogPosts: entityLoadingFailed(state.blogPosts) };

      case getType(actions.getBlogPostSingle.request):
        return { ...state, singlePost: entityLoadingStarted(state.singlePost, action.payload) };
      case getType(actions.getBlogPostSingle.success):
        return { ...state, singlePost: entityLoadingSucceeded(state.singlePost, action.payload) };
      case getType(actions.getBlogPostSingle.failure):
        return { ...state, singlePost: entityLoadingFailed(state.singlePost) };
    
    case getType(actions.getRecentPosts.request):
      return { ...state, recentPosts: entityLoadingStarted(state.recentPosts, action.payload) };
    case getType(actions.getRecentPosts.success):
      return { ...state, recentPosts: entityLoadingSucceeded(state.recentPosts, action.payload) };
    case getType(actions.getRecentPosts.failure):
      return { ...state, recentPosts: entityLoadingFailed(state.recentPosts) };
    
    case getType(actions.getTags.request):
      return { ...state, tags: entityLoadingStarted(state.tags, action.payload) };
    case getType(actions.getTags.success):
      return { ...state, tags: entityLoadingSucceeded(state.tags, action.payload) };
    case getType(actions.getTags.failure):
      return { ...state, tags: entityLoadingFailed(state.tags) };
    
    case getType(actions.getComments.request):
      return { ...state, comments: entityLoadingStarted(state.comments, action.payload) };
    case getType(actions.getComments.success):
      return { ...state, comments: entityLoadingSucceeded(state.comments, action.payload) };
    case getType(actions.getComments.failure):
      return { ...state, comments: entityLoadingFailed(state.comments) };

    default:
      return state;
  }
};

export default states;
