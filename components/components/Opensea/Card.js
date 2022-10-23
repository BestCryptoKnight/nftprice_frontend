import React, { memo } from 'react';
import styled from "styled-components";
import { toUnitAmount } from '../../core/opensea/constants';
import moment from 'moment';
import { openseaApi } from '../../core/api';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const Card = ({ nft = null, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', height, onImgLoad }) => {

    const navigateTo = (link) => {
        window.open(link);
    }
    const price = toUnitAmount(nft.basePrice, nft.paymentTokenContract.decimals);
    const priceLabel = parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 });
    const timeLeft = moment.duration(moment.unix(nft.expirationTime).diff(moment()));
    const { base } = openseaApi;

    return nft.asset ? (
        <div className={className}>
            <div className="nft__item m-0">
            { nft.item_type === 'single_items' ? (
             <div className='icontype'><i className="fa fa-bookmark"></i></div>   
             ) : (  
             <div className='icontype'><i className="fa fa-shopping-basket"></i></div>
                )
            }
            {
                nft.expirationTime !==  nft.listingTime && (
                    <div className="de_countdown">
                        <div className="Clock-days">
                            {timeLeft.humanize()} left
                        </div>
                    </div>
                )
            }
                <div className="author_list_pp">
                    <span onClick={()=> navigateTo(`${base}/${nft.asset.owner.address}`)}>                                    
                        <img className="lazy" src={nft.asset.owner.profile_img_url} alt=""/>
                        <i className="fa fa-check"></i>
                    </span>
                </div>
                <div className="nft__item_wrap" style={{height: `${height}px`}}>
                <Outer>
                    <span>
                        <img onLoad={onImgLoad} src={nft.asset.imagePreviewUrl} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                <div className="nft__item_info">
                    <span onClick={() => navigateTo(nft.asset.openseaLink)}>
                        <h4>{nft.asset.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        {priceLabel} ETH
                    </div>
                    <div className="nft__item_action">
                        <span onClick={() => navigateTo(nft.asset.openseaLink)}>{nft.side ? 'Buy now or Make offer' : 'Buy now'}</span>
                    </div>
                    <div className="nft__item_like">
                        <span></span>
                    </div>                           
                </div> 
            </div>
        </div>             
    ) : (<></>);
};

export default memo(Card);