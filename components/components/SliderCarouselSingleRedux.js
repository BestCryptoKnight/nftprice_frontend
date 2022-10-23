import React, { memo, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollectionSingle } from './constants';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import { fetchNftShowcase } from "../../components/store/actions/thunks";
// import { navigate } from "@reach/router";
import api from "../../components/core/api";

const SliderCarouselSingleRedux = () => {

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftShowcaseState);
  const nfts = nftsState.data ? nftsState.data : [];

  useEffect(() => {
    dispatch(fetchNftShowcase());
  }, [dispatch]);

  const navigateTo = (link) => {
    // navigate(link);
  }

  return (
    <div className='nft-big'>
      <Slider {...carouselCollectionSingle}>
        {nfts && nfts.map((nft, index) => (
          <div onClick={() => navigateTo(nft.nft_link)} className='itm'
            // index={index+1} 
            key={index}>
            <div className="nft_pic">
              <span>
                <span className="nft_pic_info">
                  <span className="nft_pic_title">{nft.title}</span>
                  <span className="nft_pic_by">{nft.author.username}</span>
                </span>
              </span>
              <div className="nft_pic_wrap">
                <img src={api.baseUrl + nft.preview_image.url} className="lazy img-fluid" alt="" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(SliderCarouselSingleRedux);
