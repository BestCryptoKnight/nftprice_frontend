import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;



class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );

      
  }
}

export default class Responsive extends Component {
  constructor(props) {
      super(props);
      this.state = { deadline: "January, 10, 2022", deadline1: "February, 10, 2022", deadline2: "February, 1, 2022", height: 0 };
      this.onImgLoad = this.onImgLoad.bind(this);
    }

  onImgLoad({target:img}) {
        let currentHeight = this.state.height;
        if(currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
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
        <div className='nft'>
          <Slider {...settings}>
            <CustomSlide className='itm' index={1}>
            <div className="d-item">
              <div className="nft__item">
                  <div className="de_countdown">
                  <Clock deadline={this.state.deadline} />
                  </div>
                  <div className="author_list_pp">
                      <span onClick={()=> window.open("/home1", "_self")}>                                    
                          <img className="lazy" src="./img/author/author-1.jpg" alt=""/>
                          <i className="fa fa-check"></i>
                      </span>
                  </div>
                  <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                    <Outer>
                      <span>
                          <img src="./img/items/static-1.jpg" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                      <span onClick={()=> window.open("/#", "_self")}>
                          <h4>Pinky Ocean</h4>
                      </span>
                      <div className="nft__item_price">
                          0.08 ETH<span>1/20</span>
                      </div>
                      <div className="nft__item_action">
                          <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                      </div>
                      <div className="nft__item_like">
                          <i className="fa fa-heart"></i><span>50</span>
                      </div>                            
                  </div> 
              </div>
            </div>
            </CustomSlide>

            <CustomSlide className='itm' index={2}>
              <div className="d-item">
                <div className="nft__item">
                    <div className="author_list_pp">
                        <span onClick={()=> window.open("/#", "_self")}>                                    
                            <img className="lazy" src="./img/author/author-10.jpg" alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                      <Outer>
                        <span>
                            <img src="./img/items/static-2.jpg" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h4>Deep Sea Phantasy</h4>
                        </span>
                        <div className="nft__item_price">
                            0.06 ETH<span>1/22</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>80</span>
                        </div>                                 
                    </div> 
                </div>
            </div>
            </CustomSlide>

            <CustomSlide className='itm' index={3}>
              <div className="d-item">
                <div className="nft__item">
                    <div className="de_countdown">
                    <Clock deadline={this.state.deadline1} />
                    </div>
                    <div className="author_list_pp">
                        <span onClick={()=> window.open("/#", "_self")}>                                    
                            <img className="lazy" src="./img/author/author-11.jpg" alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                      <Outer>
                        <span>
                            <img src="./img//items/static-3.jpg" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h4>Rainbow Style</h4>
                        </span>
                        <div className="nft__item_price">
                            0.05 ETH<span>1/11</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>97</span>
                        </div>                                 
                    </div> 
                </div>
            </div>
            </CustomSlide>

            <CustomSlide className='itm' index={4}>
            <div className="d-item">
                <div className="nft__item">
                    <div className="author_list_pp">
                        <span onClick={()=> window.open("/#", "_self")}>                                    
                            <img className="lazy" src="./img/author/author-12.jpg" alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                      <Outer>
                        <span>
                            <img src="./img/items/static-4.jpg" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h4>Two Tigers</h4>
                        </span>
                        <div className="nft__item_price">
                            0.02 ETH<span>1/15</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>73</span>
                        </div>                                 
                    </div> 
                </div>
            </div>
            </CustomSlide>

            <CustomSlide className='itm' index={5}>
            <div className="d-item">
                <div className="nft__item">
                    <div className="author_list_pp">
                        <span onClick={()=> window.open("/#", "_self")}>                                    
                            <img className="lazy" src="./img/author/author-9.jpg" alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                      <Outer>
                        <span>
                            <img src="./img/items/anim-4.webp" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h4>The Truth</h4>
                        </span>
                        <div className="nft__item_price">
                            0.06 ETH<span>1/20</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>26</span>
                        </div>                                 
                    </div>
                </div>
            </div>
            </CustomSlide>

            <CustomSlide className='itm' index={6}>
            <div className="d-item">
                <div className="nft__item">
                    <div className="de_countdown">
                      <Clock deadline={this.state.deadline2} />
                    </div>
                    <div className="author_list_pp">
                        <span onClick={()=> window.open("/#", "_self")}>                                    
                            <img className="lazy" src="./img/author/author-2.jpg" alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                      <Outer>
                        <span>
                            <img src="./img/items/anim-2.webp" className="lazy nft__item_preview" onLoad={this.onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h4>Running Puppets</h4>
                        </span>
                        <div className="nft__item_price">
                            0.03 ETH<span>1/24</span>
                        </div>    
                        <div className="nft__item_action">
                            <span onClick={()=> window.open("/#", "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>45</span>
                        </div>                                  
                    </div> 
                </div>
            </div>
            </CustomSlide>

          </Slider>
        </div>
    );
  }
}
