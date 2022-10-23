import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import * as actions from '../../components/store/actions/thunks';
import { clearNfts, clearFilter } from '../../components/store/actions';
import { shuffleArray } from '../../components/store/utils';
import styled from "styled-components";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const nftss = [
    {
        image: "/img/collections/cryptopunk/punk-coll1.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll2.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll3.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll4.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll1.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll2.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll3.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll4.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll1.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll2.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll3.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    },
    {
        image: "/img/collections/cryptopunk/punk-coll4.webp",
        title: "CryptoPunk #5822 sold for",
        price: "23.6M",
        time: "14 days ago"
    }
];

//react functional component
const CarouselCollectionTop = ({ showLoadMore = true, shuffle = false, authorId = null }) => {

    const dispatch = useDispatch();
    const nftItems = useSelector(selectors.nftItems);
    const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({ target: img }) => {
        let currentHeight = height;
        if (currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }

    useEffect(() => {
        // dispatch(actions.fetchNftsBreakdown(authorId));
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
            {nftss && nftss.map((nft, index) => (
                <div className='itm col-3'
                    // index={index + 1} 
                    key={index}>
                    <div className="d-item">
                        <div className="nft__item">
                            <div className="nft__item_wrap">
                                <Outer>
                                    <span>
                                        <img src={nft.image} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
                                    </span>
                                </Outer>
                            </div>
                            <div className="nft__item_info">
                                <span onClick={() => window.open("/#", "_self")}>
                                    <div className='nft__item_name'>{nft.title}</div>
                                </span>
                                <div className="coll-nft-price">
                                    ${nft.price}
                                </div>
                                <div className="coll-nft-time">
                                    <span>{nft.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {showLoadMore && nftss.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>
    );
};

export default memo(CarouselCollectionTop);
