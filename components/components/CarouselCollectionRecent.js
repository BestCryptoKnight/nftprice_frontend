import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled, { createGlobalStyle } from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection } from './constants';
import * as selectors from '../../components/store/selectors';
import { fetchNftsBreakdown } from "../../components/store/actions/thunks";
import { numberWithCommas, numFormatter } from "../../utils/customFunctions";
import { server } from "../core/api";
import Loader from "./Loader/Loader";
import moment from "moment";

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
const getDays = (val) => {
  var given = moment(val);
  var current = moment();

  //Difference in number of days
  return current.diff(given, 'days');
};


const CarouselCollectionRecent = ({ slug }) => {

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  const nfts = nftsState.data ? nftsState.data : [];
  const [nftss, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    // dispatch(actions.fetchNftsBreakdown(authorId));
    const fetchData = async () => {
      setLoading(true);
      const nftList = await fetch(
        `${server.baseUrl}/nft/getLatestSaleNfts/${slug}`,
        {
          method: "GET", // or 'PUT'
          headers: {
            [`${server.header.key}`]: `${server.header.value}`,
          },
        }
      );

      const nftListResponse = await nftList.json();
      setNfts(nftListResponse.data);
      setLoading(false);
    };

    fetchData();
  }, [slug]);


  return (
    <div>

      <div className='nft'>
        <GlobalStyles />
        <Slider {...carouselCollection}>
          {nftss && nftss.map((nft, index) => (
            <div className='itm'
              // index={index + 1} 
              key={index} style={{ height: '100%' }}>
              <div className="d-item">
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Outer>
                      <span>
                        <img src={nft.data.image_url} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <span onClick={() => window.open("/#", "_self")}>
                      <div className="nft__item_name">{nft.data.collection.name} {nft.data.name} sold for</div>
                    </span>
                    <div className="coll-nft-price">
                      {nft.data.last_sale?.total_price
                        ? numberWithCommas(
                          numFormatter(nft.data.last_sale?.total_price / 1000000000000000000)
                        ) + " ETH"
                        : `--`}
                    </div>
                    <div className="coll-nft-time">
                      <span>{nft.data.last_sale?.created_date ? getDays(nft.data.last_sale?.created_date) : '--'} days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CarouselCollectionRecent;
