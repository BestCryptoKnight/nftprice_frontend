import React, { memo } from 'react';
import styled from "styled-components";
import Clock from "./Clock";
// import { navigate } from '@reach/router';
import api from '../../components/core/api';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', clockTop = true, height, onImgLoad }) => {

    const navigateTo = (link) => {
        // navigate(link);
    }

    return (
        <div className={className}>
            <div className="nft__item m-0">
            {/* { nft.item_type === 'single_items' ? (
             <div className='icontype'><i className="fa fa-bookmark"></i></div>   
             ) : (  
             <div className='icontype'><i className="fa fa-shopping-basket"></i></div>
                )
            } */}
                { nft.deadline && clockTop &&
                    <div className="de_countdown">
                        <Clock deadline={nft.deadline} />
                    </div>
                }
                <div className="author_list_pp">
                    <span >                                    
                        <img className="lazy" src={nft.author} alt=""/>
                        <i className="fa fa-check"></i>
                    </span>
                </div>
                {/* <div className="nft__item_wrap" style={{height: `${height}px`}}> */}
                <div className="nft__item_wrap" style={{height: `251px`}}>
                <Outer>
                    <span>
                        <img onLoad={onImgLoad} src={nft.image} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                {/* { nft.deadline && !clockTop &&
                    <div className="de_countdown">
                        <Clock deadline={nft.deadline} />
                    </div>
                } */}
                <div className="nft__item_info">
                    <span >
                        <h4>{nft.title}</h4>
                    </span>
                    {/* { nft.status === 'has_offers' ? (
                            <div className="has_offers">
                                <span className='through'>{nft.priceover}</span> {nft.price} ETH
                            </div> 
                        ) : (
                            <div className="nft__item_price">
                                {nft.price} ETH
                                { nft.status === 'on_auction' && 
                                    <span>{nft.bid}/{nft.max_bid}</span>
                                }
                            </div>
                        )
                    } */}
                    <div className="nft__item_price">
                                {nft.price} ETH
                                {/* { nft.status === 'on_auction' && 
                                    <span>{nft.bid}/{nft.max_bid}</span>
                                } */}
                            </div>
                    <div className="nft__item_action">
                        {/* <span>{ nft.status === 'on_auction' ? 'Place a bid' : 'Buy Now' }</span> */}
                        <span>Place A bid</span>
                    </div>
                    {/* <div className="nft__item_like">
                        <i className="fa fa-heart"></i><span>{nft.likes}</span>
                    </div>                             */}
                </div> 
            </div>
        </div>             
    );
};

export default memo(NftCard);