import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api,{wordpressApi} from '../../../core/api';

export const getBlogPosts = (page,perPage,offset) => async (dispatch) => {

  dispatch(actions.getBlogPosts.request(Canceler.cancel));

  try {
    const  data  = await Axios.get(`${wordpressApi.baseUrl}${wordpressApi.posts}?page=${page}&per_page=${perPage}&offset=${offset}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getBlogPosts.success(data));
  } catch (err) {
    dispatch(actions.getBlogPosts.failure(err));
  }
};

export const getBlogPostSingle = (slug) => async (dispatch) => {

  dispatch(actions.getBlogPosts.request(Canceler.cancel));

  try {
    
    const { data } = await Axios.get(`${wordpressApi.baseUrl}${wordpressApi.postWithSlug}${slug}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getBlogPostSingle.success(data));
  } catch (err) {
    dispatch(actions.getBlogPostSingle.failure(err));
  }
};

export const getBlogComments = (postId) => async (dispatch) => {

  dispatch(actions.getComments.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.comments}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getComments.success(data));
  } catch (err) {
    dispatch(actions.getComments.failure(err));
  }
};

export const getBlogTags = (postId) => async (dispatch) => {

  dispatch(actions.getTags.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.tags}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getTags.success(data));
  } catch (err) {
    dispatch(actions.getTags.failure(err));
  }
};

export const getRecentPosts = () => async (dispatch) => {

  dispatch(actions.getRecentPosts.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.recent}`, {
      cancelToken: Canceler.token
    });

    dispatch(actions.getRecentPosts.success(data));
  } catch (err) {
    dispatch(actions.getRecentPosts.failure(err));
  }
};
