import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .nft-big .slick-prev::before{
    left: 0;
    line-height: 40px;
  }
  .nft-big .slick-next::before {
    right: 0;
    line-height: 40px;
  }
  .nft-big .slick-prev, .nft-big .slick-next{
    border: 1px solid #ccc;
    box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    width: 50px;
    height: 50px;
  }
  .stat-wrapper{
    max-width: 289px;
    max-height: 163px;
    width: 100%;
    height: 100%;
  }
  .stat-amount{
    font-size: 40px;
    font-weight: 800;
  }
  .stat-description{
    font-size: 20px;
    font-weight: 700;
  }
  .stat-timestamp{
    font-size: 18px;
    font-weight: 700;
    color: #00AC4F;

  }
`;

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );


  }
}

const CustomStat = (props) => {
  return (
    <div className="stat-wrapper d-flex justify-content-around flex-column p-3 pl-5 mr-5" style={{ background: props.background }}>

      <p className="stat-amount">{(props.icon) ? (props.icon === "ether") ? <i className="fab fa-ethereum"></i> : <i className="fas fa-dollar-sign"></i> : ""} <> {props.amount}</></p>
      <p className="stat-description">{props.description}</p>
      <p className="stat-timestamp">{props.timestamp}</p>
    </div>
  );
}

export default class Responsive extends Component {

  constructor(props) {
    super(props);
    this.state = { deadline: "January, 10, 2022", deadline1: "February, 10, 2022", deadline2: "February, 1, 2022", height: 0 };
  }

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    return (
      <div className='nft-big'>
        <GlobalStyles />
        <Slider {...settings}>
          <CustomSlide className='itm' index={1}>
            <div className="nft__item_lg">
              <div className="row align-items-center justify-content-between">

                <div className="col-lg-7">
                  <div className="d-desc ml-5">
                    <h1>Get all NFT Sales stats for every project</h1>
                    <p>Get every possible NFT Sales stats you will ever need for any NFT Project and Collections, including Trading values, Rarity and more.</p>
                    <div className="d-flex mobile-flex-wrap">
                      <CustomStat background="#DCF2FF" amount={this.props.soldNFTs} description="Number of NFTs sold" timestamp="Last 24 hours" />
                      <CustomStat background="#FFF1DC" icon="ether" amount={this.props.volumeNFTs} description="Trading Volume" timestamp="Last 24 hours" />

                    </div>

                  </div>
                </div>
                <div className="col-lg-3">
                  <img src="./img/carousel/squid-game-nft.webp" className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </CustomSlide>
        </Slider>
      </div>
    );
  }
}
