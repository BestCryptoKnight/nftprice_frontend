import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import * as actions from '../../components/store/actions/thunks';
import { clearNfts, clearFilter } from '../../components/store/actions';
import NftCardNew from './NftCardNew';
import NftMusicCard from './NftMusicCard';
import { shuffleArray } from '../../components/store/utils';

const nftss =[
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto1.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto2.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto3.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto4.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto1.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto5.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto4.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto1.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto5.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto6.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto1.webp",
        title: "Art Crypto",
        price: "0.25"
    },
    {
        deadline: "2022-03-10",
        author: "./img/avatar.webp",
        image: "./img/nfts/art-crypto2.webp",
        title: "Art Crypto",
        price: "0.25"
    },

];

//react functional component
const ColumnNewRedux = ({ showLoadMore = true, shuffle = false, authorId = null }) => {

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
        // dispatch(actions.fetchNftsBreakdown(authorId));
    }, [dispatch, authorId]);

    //will run when component unmounted
    useEffect(() => {
        return () => {
            dispatch(clearFilter());
            dispatch(clearNfts());
        }
    },[dispatch]);

    const loadMore = () => {
        // dispatch(actions.fetchNftsBreakdown(authorId));
    }

    return (
        <div className='row'>
            {nftss && nftss.map( (nft, index) => (
                <NftCardNew nft={nft} key={index} onImgLoad={onImgLoad} height={height} />
            ))}
            { showLoadMore && nftss.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>              
    );
};

export default memo(ColumnNewRedux);