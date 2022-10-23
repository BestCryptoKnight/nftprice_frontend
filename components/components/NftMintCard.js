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
const NftMintCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', clockTop = true, height, onImgLoad, onSelectNft }) => {

    const navigateTo = (link) => {
        // navigate(link);
    }

    return (
        <div className={className}>
            <div className="nft__item m-0">
            { nft.item_type === 'single_items' ? (
             <div className='icontype'><i className="fa fa-bookmark"></i></div>   
             ) : (  
             <div className='icontype'><i className="fa fa-shopping-basket"></i></div>
                )
            }
                <div className="author_list_pp">
                    <span onClick={()=> navigateTo(nft.author_link)}>                                    
                        <img className="lazy" src={api.baseUrl + nft.author.avatar.url} alt=""/>
                        <i className="fa fa-check"></i>
                    </span>
                </div>
                <div className="nft__item_wrap" style={{height: `${height}px`}}>
                <Outer>
                    <span>
                        <img onLoad={onImgLoad} src={api.baseUrl + nft.preview_image.url} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                { nft.deadline && !clockTop &&
                    <div className="de_countdown">
                        <Clock deadline={nft.deadline} />
                    </div>
                }
                <div className="nft__item_info">
                    <span onClick={() => navigateTo(`${nft.nft_link}/${nft.id}`)}>
                        <h4>{nft.title}</h4>
                    </span>
                    <div className="nft__item_action">
                        <span onClick={() => onSelectNft(nft)}>Select</span>
                    </div>
                    <div className="nft__item_like">
                        <span></span>
                    </div>                            
                </div> 
            </div>
        </div>             
    );
};

export default memo(NftMintCard);