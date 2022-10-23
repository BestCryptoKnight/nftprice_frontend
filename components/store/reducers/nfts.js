import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  nftBreakdown: initEntityState(null),
  nftDetail: initEntityState(null),
  nftShowcase: initEntityState(null),
  nftRarity: initEntityState(null),
  nftRarityDetail: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.getNftBreakdown.request):
      return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
    case getType(actions.getNftBreakdown.success):
      //append existing data with new data
      let payload = state.nftBreakdown.data ? [...state.nftBreakdown.data, ...action.payload] : action.payload;
      return { ...state, nftBreakdown: entityLoadingSucceeded(state.nftBreakdown, payload) };
    case getType(actions.getNftBreakdown.failure):
      return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };

    case getType(actions.getNftRarity.request):
      return { ...state, nftRarity: entityLoadingStarted(state.nftRarity, action.payload) };
    case getType(actions.getNftRarity.success):
      //append existing data with new data
      let payload_rarity = state.nftRarity.data ? [...state.nftRarity.data, ...action.payload] : action.payload;
      return { ...state, nftRarity: entityLoadingSucceeded(state.nftRarity, payload_rarity) };
    case getType(actions.getNftRarity.failure):
      return { ...state, nftRarity: entityLoadingFailed(state.nftRarity) };

    case getType(actions.getNftRarityDetail.request):
      return { ...state, nftRarityDetail: entityLoadingStarted(state.nftRarityDetail, action.payload) };
    case getType(actions.getNftRarityDetail.success):
      //append existing data with new data
      let payload_rarity_detail = state.nftRarityDetail.data ? [...state.nftRarityDetail.data, ...action.payload] : action.payload;
      return { ...state, nftRarityDetail: entityLoadingSucceeded(state.nftRarityDetail, payload_rarity_detail) };
    case getType(actions.getNftRarityDetail.failure):
      return { ...state, nftRarityDetail: entityLoadingFailed(state.nftRarityDetail) };

    case getType(actions.getNftDetail.request):
      return { ...state, nftDetail: entityLoadingStarted(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.success):
      return { ...state, nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.failure):
      return { ...state, nftDetail: entityLoadingFailed(state.nftDetail) };

    case getType(actions.getNftShowcase.request):
      return { ...state, nftShowcase: entityLoadingStarted(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.success):
      return { ...state, nftShowcase: entityLoadingSucceeded(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.failure):
      return { ...state, nftShowcase: entityLoadingFailed(state.nftShowcase) };

    case getType(actions.clearNfts):
      return { ...state, nftBreakdown: initEntityState(null) };

    default:
      return state;
  }
};

export default states;
