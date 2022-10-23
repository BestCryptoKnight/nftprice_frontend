import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserTopSeller from './UserTopSeller';
import * as selectors from '../../components/store/selectors';
import { fetchAuthorList } from "../../components/store/actions/thunks";

const AuthorList = () => {
    
    const dispatch = useDispatch();
    const authorsState = useSelector(selectors.authorsState);
    const authors = authorsState.data ? authorsState.data.slice(0,5) : [];

    useEffect(() => {
        dispatch(fetchAuthorList());
    }, [dispatch]);

    return (
        <div>
            <h3>Today's Top NFT Seller</h3>
            <p className='timestamp'>Last 24 Hours</p>
            <ol className="author_list d-flex flex-column">
            { authors && authors.map((author, index) => (
                <li key={index}>
                    <UserTopSeller user={author} />
                </li>
            ))}
            </ol>
        </div>
    );
};
export default memo(AuthorList);