import React, { useState, useEffect } from "react";
import SliderMain from "../components/components/SliderCarouselNew";
// import CarouselCollectionRedux from '../components/CarouselCollectionReduxNew';
import CarouselNewRedux from "../components/components/CarouselNewReduxNew";
import AuthorListRedux from "../components/components/AuthorListRedux";
// import Catgor from '../components/Catgor';
import TopFilterBar from "../components/components/TopFilterBar";
import ColumnNewRedux from "../components/components/ColumnNewRedux";
import styled from "styled-components";
import TopNftCollectionsFiltered from "../components/components/TopNftCollectionsFiltered";
import { Axios } from "../components/core/axios";
import { server } from "../components/core/api";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import { numFormatter, numberWithCommas } from "../utils/customFunctions";
import styles from "../components/styles/Home.module.css";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  .top-nft-collection-img-small
  {
      max-height: 100px;
      object-fit: contain;
  }

  .top-nft-collection-small-name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;white-space: nowrap;
    font-weight: 800;
    font-size: 15px;
  }
`;

const Home = () => {
  const navigate = useRouter();

  const navigateTo = (link) => {
    navigate.push(link);
  };
  const [height, setHeight] = useState(0);
  const [nfts, setNfts] = React.useState([]);
  const [bigNft, setBigNft] = React.useState({});
  const [soldNFTs, setSoldNFTs] = useState(0);
  const [volumeNFTs, setVolumeNFTs] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await Axios.get(
          `${server.baseUrl}${server.collections}/getSevenDayTopCollections`,
          {
            params: {},
            headers: {
              [`${server.header.key}`]: `${server.header.value}`,
            },
          }
        );
        setBigNft(data.data.data[0].data);
        setNfts(data.data.data.slice(1, 5));
        const data5 = await Axios.get(
          `${server.baseUrl}${server.home}/Stats`,
          {
            params: {},
            headers: {
              [`${server.header.key}`]: `${server.header.value}`,
            },
          }
        )
        setSoldNFTs(data5.data.data.DailySale);
        setVolumeNFTs(numFormatter(data5.data.data.TradingVolume));
      } catch (err) { }
    };

    fetchStats();
  }, []);
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <main>
      <GlobalStyles />
      <Head>
        <title>Get all NFT Sales stats for every project</title>
        <meta
          name="title"
          content="Get all NFT Sales stats for every project"
        ></meta>
      </Head>
      <section
        className="jumbotron  no-bg bwhite mb-0"
        style={{ backgroundImage: `url(${"./img/background/12.jpg"})` }}
      >
        <div className="spacer-single"></div>
        <div className="container">
          <div className="row">
            <SliderMain soldNFTs={soldNFTs} volumeNFTs={volumeNFTs} />
          </div>
        </div>
      </section>

      <TopNftCollectionsFiltered />

      <section
        className="container no-bottom"
        style={{ background: "#ebf0f4", maxWidth: "100%" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Todays Top 9 NFT Collections</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <CarouselNewRedux />
          </div>
        </div>
      </section>






    </main>
  );
};
export default Home;
