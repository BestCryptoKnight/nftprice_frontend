import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  hotCollections: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getHotCollections.request):
      return { ...state, hotCollections: entityLoadingStarted(state.hotCollections, action.payload) };
    case getType(actions.getHotCollections.success):
      return { ...state, hotCollections: entityLoadingSucceeded(state.hotCollections, action.payload) };
    case getType(actions.getHotCollections.failure):
      return { ...state, hotCollections: entityLoadingFailed(state.hotCollections) };    
    default:
      return state;
  }
};

export default states;
