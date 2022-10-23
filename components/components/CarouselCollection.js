import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled, { createGlobalStyle } from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection } from './constants';
import * as selectors from '../../components/store/selectors';
import { fetchNftsBreakdown } from "../../components/store/actions/thunks";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const GlobalStyles = createGlobalStyle`
  .coll-nft-price{
    font-size: 20px;
    font-weight: 700;
    color: #000;
  }

  .coll-nft-time{
    color: #636363;
    font-size: 14px;
  }
`;



const CarouselCollection = () => {

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  const nfts = nftsState.data ? nftsState.data : [];

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
    }
  ];
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  useEffect(() => {
    // dispatch(fetchNftsBreakdown());
  }, [dispatch]);

  return (
    <div className='nft'>
      <GlobalStyles />
      <Slider {...carouselCollection}>
        {nftss && nftss.map((nft, index) => (
          <div className='itm'
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
                    <div className="nft__item_name">{nft.title}</div>
                  </span>
                  <div className="coll-nft-price">
                    ${nft.price}
                  </div>
                  <div className="coll-nft-time">
                    <span >{nft.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(CarouselCollection);
