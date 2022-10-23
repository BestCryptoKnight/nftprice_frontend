import React, { memo, useEffect, useState } from 'react';
import AssetCard from './AssetCard';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider } from '../../core/opensea/constants';

//react functional component
const Assets = ({ showLoadMore = true, side = null, owner = null }) => {
    const [height, setHeight] = useState(0);
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState();
    const [currentSide, setCurrentSide] = useState(side);
    const [currentOwner, setCurrentOwner] = useState(side);


    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }

    const fetchData = async (resetData = false, currentPage = 1) => {
        let accountAddress = '';
        try{
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            accountAddress = addressArray[0];
        } catch (err) {
            console.log(err)
        }
        const seaport = new OpenSeaPort(web3Provider, {
            networkName: Network.Rinkeby
        });

        const query = {};
        if(resetData) {
            query.offset = 0;
        }
        if(owner) {
            query.owner = accountAddress;
            query.limit = 10;
            const { assets } = await seaport.api.getAssets(query, currentPage)
            let nfts = orderList ? !resetData ? [...orderList, ...assets] : assets : assets;
            setOrderList(nfts);
        }
    }
    
    useEffect(() => {
        if(owner !== currentOwner) {
            setCurrentOwner(owner);
        }
        if(side !== currentSide) {
            setCurrentSide(side);
        } 
        if(owner !== currentOwner || side !== currentSide) {
            setTimeout(() => fetchData(true), 1000);
            setPage(1);
        }
        else {
            setTimeout(() => fetchData(), 1000);
        }
    }, [side, owner]);

    const loadMore = () => {
        setPage(page+1);
        fetchData(false, page+1);
    }

    return (
        <div className='row'>
            {orderList && orderList.map( (nft, index) => (
                <AssetCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} />
            ))}
            { showLoadMore && orderList &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>              
    );
};

export default memo(Assets);