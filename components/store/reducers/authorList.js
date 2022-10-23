import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  authorList: initEntityState(null),
  authorRanking: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getAuthorList.request):
      return { ...state, authorList: entityLoadingStarted(state.authorList, action.payload) };
    case getType(actions.getAuthorList.success):
      return { ...state, authorList: entityLoadingSucceeded(state.authorList, action.payload) };
    case getType(actions.getAuthorList.failure):
      return { ...state, authorList: entityLoadingFailed(state.authorList) };
    
      case getType(actions.getAuthorRanking.request):
      return { ...state, authorRanking: entityLoadingStarted(state.authorRanking, action.payload) };
    case getType(actions.getAuthorRanking.success):
      return { ...state, authorRanking: entityLoadingSucceeded(state.authorRanking, action.payload) };
    case getType(actions.getAuthorRanking.failure):
      return { ...state, authorRanking: entityLoadingFailed(state.authorRanking) };

    default:
      return state;
  }
};

export default states;
