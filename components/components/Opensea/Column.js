import React, { memo, useEffect, useState } from 'react';
import Card from './Card';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider } from '../../core/opensea/constants';

//react functional component
const Column = ({ showLoadMore = true, side = null, owner = null, ownerAddress = null }) => {
    const [height, setHeight] = useState(0);
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState();
    const [currentSide, setCurrentSide] = useState(side);
    const [currentOwner, setCurrentOwner] = useState(owner);
    const [address, setAddress] = useState();


    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }

    const fetchData = async (resetData = false, currentPage = 1) => {
        const seaport = new OpenSeaPort(web3Provider, {
            networkName: Network.Rinkeby
        });

        const query = {
            // Possible query options:
            // 'bundled'
            // 'asset_contract_address'
            // 'taker'
            // 'token_id'
            // 'token_ids'
            // 'sale_kind'
            
        };
        if(side !== null) {
            query.side = side;
        }
        if(resetData) {
            query.offset = 0;
        }
        if(owner !== null || ownerAddress !== null) {
            if (owner) {
                query.owner = address;
            } else {
                query.maker = address;
            }
            if(ownerAddress) {
                query.owner = ownerAddress;
            }
        }
        console.log(query);

        const { orders } = await seaport.api.getOrders(query, currentPage)
        let nfts = orderList ? !resetData ? [...orderList, ...orders] : orders : orders;
        setOrderList(nfts);
    }

    const getAddress = async () => {
        try {
            const addressArray = await window.ethereum.request({
              method: "eth_accounts",
            });
            setAddress(addressArray[0]);
        } catch (err) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAddress(addressArray[0]);
            } catch (errRequest) {
                console.log(errRequest)
            }
        }
    }
    
    useEffect(() => {
        getAddress();
        if(owner !== currentOwner) {
            setCurrentOwner(owner);
        }
        if(side !== currentSide) {
            setCurrentSide(side);
        } 
        if(owner !== currentOwner || side !== currentSide) {
            fetchData(true);
            setPage(1);
        }
        else {
            fetchData();
        }
    }, [side, owner]);

    const loadMore = () => {
        setPage(page+1);
        fetchData(false, page+1);
    }

    return (
        <div className='row'>
            {orderList && orderList.map( (nft, index) => (
                <Card nft={nft} key={index} onImgLoad={onImgLoad} height={height} />
            ))}
            { showLoadMore &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>              
    );
};

export default memo(Column);