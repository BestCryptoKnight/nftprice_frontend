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

  .blog-slider-img{
    width: 100%;
    object-fit: contain;
  }

  .blog-slider-description{
    width: 100%;
    height: 100%;
    max-width: 540px;
    max-height: 210px;
    background: black;
    opacity: 0.7;
    bottom: 7%;
    left: 10%;
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

const CustomStat = (props)=>{
    return(
        <div className="stat-wrapper d-flex justify-content-around flex-column p-3 pl-5 mr-5" style={{background: props.background}}>
            <p className="stat-amount">{props.amount}</p>
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
            <div className='nft-big-news'>
                <GlobalStyles />
                <Slider {...settings}>
                    <CustomSlide className='itm' index={1}>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 position-relative">
                                    <img className="blog-slider-img" src='/img/carousel/blog/slider-blog1.webp' alt=""></img>
                                    <div className="blog-slider-description position-absolute p-5"> 
                                        <h2 className="text-white">Memes That Have Made Money Through NFTs</h2>
                                        <p className="text-white">February 18, 2022</p>
                                    </div>
                                </div>
                            </div>
                    </CustomSlide>

                    <CustomSlide className='itm' index={2}>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 position-relative">
                                    <img className="blog-slider-img" src='/img/carousel/blog/slider-blog1.webp' alt=""></img>
                                    <div className="blog-slider-description position-absolute p-5"> 
                                        <h2 className="text-white">Memes That Have Made Money Through NFTs</h2>
                                        <p className="text-white">February 18, 2022</p>
                                    </div>
                                </div>
                            </div>
                    </CustomSlide>

                    <CustomSlide className='itm' index={3}>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 position-relative">
                                    <img className="blog-slider-img" src='/img/carousel/blog/slider-blog1.webp' alt=""></img>
                                    <div className="blog-slider-description position-absolute p-5"> 
                                        <h2 className="text-white">Memes That Have Made Money Through NFTs</h2>
                                        <p className="text-white">February 18, 2022</p>
                                    </div>
                                </div>
                            </div>
                    </CustomSlide>

                    <CustomSlide className='itm' index={4}>
                            <div className="row align-items-center justify-content-between">
                                <div className="col-12 position-relative">
                                    <img className="blog-slider-img" src='/img/carousel/blog/slider-blog1.webp' alt=""></img>
                                    <div className="blog-slider-description position-absolute p-5"> 
                                        <h2 className="text-white">Memes That Have Made Money Through NFTs</h2>
                                        <p className="text-white">February 18, 2022</p>
                                    </div>
                                </div>
                            </div>
                    </CustomSlide>
                </Slider>
            </div>
        );
    }
}
