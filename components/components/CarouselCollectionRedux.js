import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from "./constants";
import CustomSlide from "./CustomSlide";
import * as selectors from '../../components/store/selectors';
import { fetchHotCollections } from "../../components/store/actions/thunks";
import api from "../../components/core/api";

const CarouselCollectionRedux = () => {

  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data ? hotCollectionsState.data : [];

  useEffect(() => {
    dispatch(fetchHotCollections());
}, [dispatch]);

  return (
      <div className='nft'>
        <Slider {...settings}>
          { hotCollections && hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={api.baseUrl + item.author.avatar.url}
              banner={api.baseUrl + item.banner.url}
              username={item.name}
              uniqueId={item.unique_id}
              collectionId={item.id}
            />
          ))}
        </Slider>
      </div>
  );
}

export default memo(CarouselCollectionRedux);
