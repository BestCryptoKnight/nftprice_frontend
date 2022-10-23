import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import { server } from '../../../core/api';
import { useSelector } from 'react-redux';
import * as selectors from '../../selectors'

export const fetchSalesData = (slug) => async (dispatch) => {
    dispatch(actions.getSalesData.request(Canceler.cancel));

    try {
        const data = await Axios.get(`${server.baseUrl}${server.collections}/getSalesData/${slug}`, {
            cancelToken: Canceler.token,
            params: {},
            headers: {
                [`${server.header.key}`]: `${server.header.value}`
            }
        });

        dispatch(actions.getSalesData.success(data));
    } catch (err) {
        dispatch(actions.getSalesData.failure(err));
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


        dispatch(actions.getTopCollectionsPrevNext.success(topCollectionsState));
    } catch (err) {
        dispatch(actions.getTopCollectionsPrevNext.failure(err));
    }
};

