import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselNew5 } from './constants';
import * as selectors from '../../components/store/selectors';
import { fetchNftsBreakdown } from "../../components/store/actions/thunks";
import { useRouter } from 'next/router';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
`;

const CarouselNewRedux = () => {
  const navigate = useRouter();

  const navigateTo = (link) => {
    navigate.push(link);
  }

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  const nfts = nftsState.data?.data ? nftsState?.data?.data : [];
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  useEffect(() => {
    dispatch(fetchNftsBreakdown());
  }, [dispatch]);

  return (
    <div className='nft'>
      <Slider {...carouselNew5}>
        {nfts && nfts.map((nft, index) => (
          <div className='itm'
            // index={index + 1} 
            key={index}>
            <div className="d-item">
              <div className="nft__item nft__item__fixed" style={{ backgroundImage: `url("img/background.jpg")`, cursor: 'pointer' }} onClick={() => navigateTo(`/collections/${nft.data.slug}`)}>
                {/* <div className="author_list_pp">
                        <span onClick={()=> window.open("/home1", "_self")}>
                            <img className="lazy" src={nft.author} alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div> */}
                <div className="nft__item_wrap_slider" >
                  <Outer>
                    <span className="h-100">
                      <img src={nft.data.image_url} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
                    </span>
                  </Outer>
                </div>
                <div className="nft__item_info">
                  <span onClick={() => window.open("/#", "_self")}>
                    <h4>{nft.data.name}</h4>
                  </span>
                  <div className="nft__item_price">
                    <i className="fab fa-ethereum"></i> {parseFloat(nft.data.stats?.one_day_volume).toFixed(2)}
                  </div>
                  {/* <div className="nft__item_action">
                            <span >Mint</span>
                        </div>                                                       */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(CarouselNewRedux);
