import React, { memo } from 'react';
import styled from "styled-components";
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
const AssetCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', height, onImgLoad }) => {

    const navigateTo = (link) => {
        window.open(link);
    }
    const { base } = openseaApi;

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
                    <span onClick={()=> navigateTo(`${base}/${nft.owner.address}`)}>                                    
                        <img className="lazy" src={nft.owner.profile_img_url} alt=""/>
                        <i className="fa fa-check"></i>
                    </span>
                </div>
                <div className="nft__item_wrap" style={{height: `${height}px`}}>
                <Outer>
                    <span>
                        <img onLoad={onImgLoad} src={nft.imagePreviewUrl} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                <div className="nft__item_info">
                    <span onClick={() => navigateTo(nft.openseaLink)}>
                        <h4>{nft.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        <span></span>
                    </div>
                    <div className="nft__item_action">
                        <span onClick={() => navigateTo(nft.openseaLink)}>View on OpenSea</span>
                    </div>
                    <div className="nft__item_like">
                        <span></span>
                    </div>                           
                </div> 
            </div>
        </div>             
    );
};

export default memo(AssetCard);