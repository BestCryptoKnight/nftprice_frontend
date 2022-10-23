import React, { memo, useEffect, useState } from 'react';
import NftMusicCard from "./NftMusicCard";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import * as actions from '../../components/store/actions/thunks';
import { clearNfts, clearFilter } from '../../components/store/actions';
import { shuffleArray } from '../../components/store/utils';

const ColumnNewSound = ({ showLoadMore = true, shuffle = false, authorId = null }) => {
    const dispatch = useDispatch();
    const nftItems = useSelector(selectors.nftItems);
    const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(clearNfts());
        dispatch(actions.fetchNftsBreakdown(authorId, true));
    }, [dispatch, authorId]);

    //will run when component unmounted
    useEffect(() => {
        return () => {
            dispatch(clearFilter());
            dispatch(clearNfts());
        }
    },[dispatch]);

    const loadMore = () => {
        dispatch(actions.fetchNftsBreakdown(authorId, true));
    }

    return (
        <div className='row'>
            {nfts && nfts.map( (nft, index) => (
                <NftMusicCard nft={nft} audioUrl={nft.audio_url} key={index} onImgLoad={onImgLoad} height={height} />
            ))}
            { showLoadMore && nfts.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>              
    );
}

export default memo(ColumnNewSound);