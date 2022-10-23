import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import * as actions from '../../components/store/actions/thunks';
import { clearNfts, clearFilter, fetchRarityDetails } from '../../components/store/actions';
import { shuffleArray } from '../../components/store/utils';
import styled from "styled-components";
import { useRouter } from 'next/router';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

//react functional component
const ColumnCollectionRarity = ({ showLoadMore = true, shuffle = false, authorId = null }) => {

    const navigate = useRouter();

    const navigateTo = (link) => {
        navigate.push(link);
    }

    const dispatch = useDispatch();
    const nftItems = useSelector(selectors.nftRarityState);
    // const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    const nfts = nftItems ? nftItems?.data?.data : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({ target: img }) => {
        let currentHeight = height;
        if (currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }

    useEffect(() => {
        dispatch(actions.fetchNftsRarity(authorId));
    }, [dispatch, authorId]);

    //will run when component unmounted
    useEffect(() => {
        return () => {
            // dispatch(clearFilter());
            // dispatch(clearNfts());
        }
    }, [dispatch]);

    const loadMore = () => {
        // dispatch(actions.fetchNftsBreakdown(authorId));
    }

    return (
        <div className='contianer row'>
            {nfts && nfts.map((nft, index) => (
                <div className='itm col-3'
                    // index={index + 1} 
                    key={index}>
                    <div className="d-item">
                        <div className="nft__item " onClick={() => navigateTo(`/rarity/${nft.data.slug}`)}>
                            <div className="nft__item_wrap">
                                <Outer>
                                    <span className='nft__item__fixed__small'>
                                        <img src={nft.data.image_url} className="lazy  nft__item_preview" onLoad={onImgLoad} alt="" style={{ height: '250px !important' }} />
                                    </span>
                                </Outer>
                            </div>
                            <div className="nft__item_info">
                                <span onClick={() => window.open("/#", "_self")}>
                                    <h4>{nft.data.name}</h4>
                                </span>
                                <div className="coll-nft-price">
                                    <i className='fab fa-ethereum'></i>{parseFloat(nft.data.stats.one_day_volume).toFixed(2)}
                                </div>
                                {/* <div className="coll-nft-time">
                                    <span >{nft.time}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {showLoadMore && nfts?.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>
    );
};

export default memo(ColumnCollectionRarity);