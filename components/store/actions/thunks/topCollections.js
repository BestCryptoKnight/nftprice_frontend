import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import {server} from '../../../core/api';
import { useSelector } from 'react-redux';
import * as selectors from '../../selectors'

export const fetchTopCollections = (timefilter) => async (dispatch) => {
  dispatch(actions.getTopCollections.request(Canceler.cancel));

  try {
    const  data  = await Axios.get(`${server.baseUrl}${server.collections}/getCollections/${timefilter}`, {
      cancelToken: Canceler.token,
      params: {},
      headers: {
        [`${server.header.key}`]: `${server.header.value}`
      }
    });
    
    dispatch(actions.getTopCollections.success(data));
  } catch (err) {
    dispatch(actions.getTopCollections.failure(err));
  }
};

export const fetchTopCollectionsPrevNext = (slug) => async (dispatch) => {
  dispatch(actions.getTopCollectionsPrevNext.request(Canceler.cancel));

  try {
    const topCollectionsState = await useSelector(selectors.topNftCollections);

    const collections = topCollectionsState.data.data;

    let prevNext = {
      prev: null,
      next: null
    }

    console.log(collections);

    
    dispatch(actions.getTopCollectionsPrevNext.success(topCollectionsState));
  } catch (err) {
    dispatch(actions.getTopCollectionsPrevNext.failure(err));
  }
};

