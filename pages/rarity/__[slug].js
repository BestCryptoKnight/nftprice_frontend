import React, { useState, useEffect } from 'react';
import ColumnCollectionRarity from '../../components/components/ColumnCollectionRarity';
import { createGlobalStyle } from 'styled-components';
import RarityTraitsFilter from '../../components/components/RarityTraitsFilter';
import TopFilterBar from '../../components/components/TopFilterBar';
import { useRouter } from 'next/router';
import { server } from '../../components/core/api';
import { Axios } from '../../components/core/axios';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }

  .main-stat-card{
      border-radius: 13.1647px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .stat-detail-card{
      border-radius: 10px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .stat-detail-heading{
      color: #00AC4F;
      font-size: 20px;
    }

    .stat-detail-text{
      font-size: 14px;
      font-weight: 700;
    }

    .stat-detail-time{
      font-size: 10px;
      color: #636363;
    }

    .stat-detail-heading-l{
      color: #00AC4F;
      font-size: 50px;
    }

    .stat-detail-text-l{
      font-size: 28px;
      font-weight: 700;
    }

    .stat-detail-time-l{
      font-size: 18px;
      color: #636363;
    }
`;

const SmallStat = (props) => {
    return (
        <div className={`p-2 ${props.className}`}>
            <div
                className={` w-100 card d-flex flex-column justify-content-center align-items-center stat-detail-card`}>
                <h2 className='stat-detail-heading m-0'>{props.heading}</h2>
                <p className='stat-detail-text m-0'>{props.text}</p>
                <p className='stat-detail-time'>{props.time}</p>
            </div>
        </div>
    );
};

const SocialIcon = (props) => {
    return (
        <a className='d-flex align-items-center justify-content-center mr-4' href={props.link} target="_blank"
            rel="noreferrer">
            <i className={`${props.icon} fa-lg mr-2`} />
            <p className='p-0 m-0'>{props.title}</p>
        </a>
    );
}


const explore = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [collection, setCollection] = useState({});


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchStats = async () => {
            try {
                const data = await Axios.get(`${server.baseUrl}${server.collections}/getCollectionDetail/${slug}`, {
                    params: {},
                    headers: {
                        [`${server.header.key}`]: `${server.header.value}`
                    }
                });
                setCollection(data?.data?.data[0]?.data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }

        }

        fetchStats();
    }, [slug])

    return (



        <div>
            <GlobalStyles />
            <section className='container'>
                <div className='row'>
                    {/* <div className="spacer-double"></div> */}
                    <div className='col-md-3'>
                        <RarityTraitsFilter />
                    </div>
                    <div className="col-md-9 d-flex flex-column">
                        {collection &&
                            <>

                                <div className='col-12'>
                                    <img src={collection?.banner_image_url} className="w-100" alt=""></img>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='spacer-single'></div>
                                    <div className='text-center'>
                                        <h2>{collection?.name} Ranked by Rarity</h2>
                                        <div className="small-border"></div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='card  main-stat-card p-3'>
                                        <div className='row'>

                                            {/* <img className='col-4' src={collection.image_url} alt=""></img> */}
                                            <div className='col-12 d-flex flex-column justify-content-between p-2'>
                                                <h4 className='col-12'>{collection.name} Statistics</h4>
                                                <div className='d-flex col-12 flex-wrap'>
                                                    <SmallStat className='col-4' heading={collection?.stats?.seven_day_sales}
                                                        text="Number of NFT's sold" time="Last 7 days" />
                                                    <SmallStat className='col-4'
                                                        heading={`$${parseFloat(collection?.stats?.seven_day_volume).toFixed(2)}M`}
                                                        text="Trading Volume" time="Last 7 days" />
                                                    <SmallStat className='col-4'
                                                        heading={`$${parseFloat(collection?.stats?.seven_day_average_price).toFixed(2)}K`}
                                                        text="Average Price" time="Last 7 days" />
                                                    <SmallStat className='col-4' heading={collection?.stats?.num_owners}
                                                        text="Total Owners" time="Number of owners" />
                                                    <SmallStat className='col-4' heading={collection?.stats?.total_supply}
                                                        text="Total Supply" time="Number of tokens" />
                                                    <SmallStat className='col-4' heading={collection?.stats?.floor_price}
                                                        text="Floor Price" time="Lowest Ask Price" />
                                                </div>

                                                {/*
                  <h4 className='col-12'>About</h4>
                  <p className='col-12'>{collection.description}</p>
*/}
                                                <div className='d-flex col-12'>
                                                    {collection?.external_url && <SocialIcon title="Website" icon="fa-solid fa-blog"
                                                        link={collection.external_url} />}
                                                    {collection?.twitter_username &&
                                                        <SocialIcon title="Twitter" icon="fa fa-twitter"
                                                            link={`https://twitter.com/${collection.twitter_username}`} />}
                                                    {collection?.discord_url && <SocialIcon title="Discord" icon="fa fa-discord"
                                                        link={collection.discord_url} />}
                                                    {collection?.instagram_username &&
                                                        <SocialIcon title="Instagram" icon="fa fa-instagram"
                                                            link={`https://www.instagram.com/${collection.instagram_username}`} />}
                                                    {collection?.telegram_url && <SocialIcon title="Telegram" icon="fa fa-telegram"
                                                        link={collection.telegram_url} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        <div className='col-lg-12'>
                            <div className='spacer-double'></div>
                            <TopFilterBar />
                        </div>
                        <ColumnCollectionRarity />
                    </div>
                </div>
            </section>
        </div>
    );

};
export default explore;