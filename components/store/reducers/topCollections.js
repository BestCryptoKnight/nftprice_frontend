import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  topCollections: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getTopCollections.request):
      return { ...state, topCollections: entityLoadingStarted(state.topCollections, action.payload) };
    case getType(actions.getTopCollections.success):
      return { ...state, topCollections: entityLoadingSucceeded(state.topCollections, action.payload) };
    case getType(actions.getTopCollections.failure):
      return { ...state, topCollections: entityLoadingFailed(state.topCollections) };    
    default:
      return state;
  }
};

export default states;
