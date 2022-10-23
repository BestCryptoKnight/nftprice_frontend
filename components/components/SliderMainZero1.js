import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const slidermainzero= () => (
 <div className="container">
    <div className="row align-items-center">
          <div className="col-md-6 m-auto">
              <div className="spacer-single"></div>
              <div className="spacer-double"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <h6 className="text-center"><span className="text-uppercase color">Gigaland Market</span></h6>
              </Reveal>
              <div className="spacer-half"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600}>
              <h1 className="text-center">NFT Marketplace For Musical Arts</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600}>
              <p className="lead text-center">
              Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable
              </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={600}>
              <div className='d-flex justify-content-center'>
                <span onClick={()=> window.open("#", "_self")} className="btn-main inline lead">Explore</span>
              </div>
              <div className="spacer-single"></div>
              <div className="spacer-half"></div>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={1000} duration={600}>
              <div className="wallet-images-group-1">
                <img src="./img/wallet/1.png" alt=""/>
                <img src="./img/wallet/2.png" alt=""/>
                <img src="./img/wallet/3.png" alt=""/>
                <img src="./img/wallet/4.png" alt=""/>
                <img src="./img/wallet/5.png" alt=""/>
                <img src="./img/wallet/6.png" alt=""/>
                <img src="./img/wallet/7.png" alt=""/>
                <img src="./img/wallet/8.png" alt=""/>
              </div>
              </Reveal>
          </div>
      </div>
    </div>
);
export default slidermainzero;