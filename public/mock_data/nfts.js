import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

export const fetchNftsBreakdown = (authorId) => async (dispatch, getState) => {
  
  //access the state
  const state = getState();

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    let filter = authorId ? 'author='+authorId : '';
    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}?${filter}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftBreakdown.success(data));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (nftId) => async (dispatch) => {

  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}/nft_detail.json`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};
