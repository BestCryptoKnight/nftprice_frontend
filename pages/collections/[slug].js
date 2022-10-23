import React, {useEffect, useState} from "react";
import CarouselCollectionRecent from "../../components/components/CarouselCollectionRecent";
// import TopFilterBar from '../components/TopFilterBar';
import CarouselCollectionNftTop from "../../components/components/CarouselCollectionNftTop";
import {createGlobalStyle} from "styled-components";
import ZoomableTimeSeries from "../../components/components/Charts/ZoomableTimeSeries";
import SalesChart from "../../components/components/Charts/SalesChart";
import TwitterChart from "../../components/components/Charts/TwitterChart";
import {server} from "../../components/core/api";
import {Axios} from "../../components/core/axios";
import {useRouter} from "next/router";
import Head from "next/head";
import {numFormatter, numberWithCommas} from "../../utils/customFunctions";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import * as selectors from "../../components/store/selectors";
import {fetchTopCollectionsPrevNext} from "../../components/store/actions/thunks/topCollections";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {response} from "msw";
import Link from "next/link";

const GlobalStyles = createGlobalStyle`

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
      font-weight: 700;
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

    .coll-main-title{
        font-size: 20px;
        font-weight: 900;
    }
`;

const nftss = [
    {
        author: "./img/avatar.webp",
        image: "./img/nfts/monster-of-metaverse.webp",
        title: "The Futr Abstr",
        price: "0.25",
    },
    {
        author: "./img/avatar.webp",
        image: "./img/nfts/queen-of-alaska.webp",
        title: "The Futr Abstr",
        price: "0.56",
    },
    {
        author: "./img/avatar.webp",
        image: "./img/nfts/3d-robotic-of-metaverse.webp",
        title: "The Futr Abstr",
        price: "0.35",
    },
];

const SmallStat = (props) => {
    return (
        <div className={`p-2 ${props.className}`}>
            <div
                className={` w-100 card d-flex flex-column justify-content-center align-items-center stat-detail-card`}
            >
                <div className="stat-detail-heading m-0">
                    {props.icon}
                    {props.heading}
                </div>
                <div className="stat-detail-text m-0">{props.text}</div>
                <div className="stat-detail-time">{props.time}</div>
            </div>
        </div>
    );
};

const LargeStat = (props) => {
    return (
        <div className={`${props.className} mt-1 mb-2`}>
            <div
                className={`card d-flex flex-column justify-content-between text-align-center align-items-center stat-detail-card p-4`}
                style={{height: '100%'}}
            >
                <div className="d-flex stat-detail-heading-l m-0">
                    {props.icon}
                    {props.heading}</div>
                <div className="stat-detail-text-l m-0">{props.text}</div>
                <div className="stat-detail-time-l">{props.time}</div>
            </div>
        </div>
    );
};

const SocialIcon = (props) => {
    return (
        <a
            className="d-flex align-items-center justify-content-center"
            href={props.link}
            target="_blank"
            rel="noreferrer"
        >
            <i className={`${props.icon} fa-lg mr-2`}/>
            <p className="p-0 m-0">{props.title}</p>
        </a>
    );
};

const Collections = ({
                         serverCollection,
                         resHighestLowestValues,
                         twitterChartData,
                         salesData,
                         discardData,
                         priceAPIData,
                     }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const topCollectionsState = useSelector(selectors.topNftCollections);
    const topCollections = topCollectionsState?.data?.data?.data
        ? topCollectionsState.data.data.data
        : [];
    const collectionName = serverCollection.data[0].data.name;
    const collectionOwners = serverCollection.data[0].data.stats.num_owners;
    const thirty_day_sales = serverCollection.data[0].data.stats.thirty_day_sales;
    const latest_sale_total_price =
        serverCollection.latestsale != null
            ? serverCollection.latestsale.total_price / Math.pow(10, serverCollection.latestsale.payment_token.decimals)
            : null;
    const latest_sale_date =
        serverCollection.latestsale != null
            ? moment(serverCollection.latestsale.created_date).format(
                "MMMM Do YYYY, h:mm:ss a"
            )
            : null;
    const latest_sale_token_id =
        serverCollection.latestsale != null
            ? serverCollection.latestsale.asset.token_id
            : null;
    const nft_Lowest_Price = numberWithCommas(
        numFormatter(parseInt(resHighestLowestValues.nft_Lowest_Price))
    );
    const nft_Highest_Price = numberWithCommas(
        !isNaN(numFormatter(parseInt(resHighestLowestValues.nft_Highest_Price))) ? numFormatter(parseInt(resHighestLowestValues.nft_Highest_Price)) : 0
    );
    const Median = (!isNaN(numberWithCommas(parseInt(numFormatter(resHighestLowestValues.Median))))) ? numberWithCommas(parseInt(numFormatter(resHighestLowestValues.Median))) : 0;
    /*resHighestLowestValues.Median != null
        ? numberWithCommas(parseInt(numFormatter(resHighestLowestValues.Median)))
        : 0;*/


    const {slug} = router.query;
    const [collection, setCollection] = useState({});
    const [sales, setSales] = useState([]);

    const [prevCollection, setPrevCollection] = useState({});
    const [nextCollection, setNextCollection] = useState({});

    const handlePrevCollection = () => {
        if (prevCollection?.Name)
            router.push(`/collections/${prevCollection.Slug}`);
    };

    const handleNextCollection = () => {
        if (nextCollection?.Name)
            router.push(`/collections/${nextCollection.Slug}`);
    };

    // const cruncyswitch = () => {
    //     let sevendayvolum = collection?.stats?.seven_day_volume;
    //     if (sevendayvolum = collection?.stats?.seven_day_volume) {
    //         collection?.stats?.seven_day_volume = collection?.stats?.seven_day_volume * 220;
    //     }
    //     else {
    //         collection?.stats?.seven_day_volume
    //     }

    // };
    const arrTwitterChartData = [];
    const arrSalesChartData = [];
    const arrDiscardChartData = [];

    for (var i = 0; i < twitterChartData.data.length; i++) {
        let obj = {};
        obj.x = new Date(twitterChartData.data[i]["Date"]).getTime();
        obj.y = twitterChartData.data[i]["follower"];
        arrTwitterChartData.push(obj);
    }
    for (var i = 0; i < salesData.data.length; i++) {
        let obj = {};
        obj.x = new Date(salesData.data[i]["Date"]).getTime();
        obj.y = salesData.data[i]["price"];
        arrSalesChartData.push(obj);
    }
    for (var i = 0; i < discardData.data.length; i++) {
        let obj = {};
        obj.x = new Date(discardData.data[i]["Date"]).getTime();
        obj.y = discardData.data[i]["follower"];
        arrDiscardChartData.push(obj);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchStats = async () => {
            try {
                const data3 = await Axios.get(
                    `${server.baseUrl}${server.collections}/getSalesData/${slug}/all`,
                    {
                        params: {},
                        headers: {
                            [`${server.header.key}`]: `${server.header.value}`,
                        },
                    }
                );
                setSales(data3?.data.data);

                const data = await Axios.get(
                    `${server.baseUrl}${server.collections}/getCollectionDetail/${slug}`,
                    {
                        params: {},
                        headers: {
                            [`${server.header.key}`]: `${server.header.value}`,
                        },
                    }
                );

                setCollection(data?.data?.data[0]?.data);


                const time = localStorage.getItem("collection_time");
                const data2 = await Axios.get(
                    `${server.baseUrl}${server.collections}/getPageLinkSlugs/${time === null ? "1d" : time
                    }`,
                    {
                        params: {},
                        headers: {
                            [`${server.header.key}`]: `${server.header.value}`,
                        },
                    }
                );
                const slugs = data2.data.data;
                for (let i = 0; i < slugs.length; i++) {
                    if (slugs[i].Slug === slug) {
                        //If the collection is first one
                        if (i === 0) {
                            setPrevCollection(null);
                            setNextCollection(slugs[i + 1]);
                        }
                        //If collection is last
                        else if (i === slugs.length - 1) {
                            setNextCollection(null);
                            setPrevCollection(slugs[i - 1]);
                        }

                        //If collection in middle
                        else {
                            setNextCollection(slugs[i + 1]);
                            setPrevCollection(slugs[i - 1]);
                        }

                        break;
                    }
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchStats();
    }, [slug]);

    useEffect(() => {
        dispatch(fetchTopCollectionsPrevNext(slug));
    }, [dispatch, slug]);
    const [usdprice, setusdprice] = useState();

    function price_to_usd() {
        setusdprice(priceAPIData.data.USD * collection?.stats?.seven_day_volume)
    }

    const percentileToUsd = (num) => {
        return num * priceAPIData.data.USD;
    }

    const [averageusdprice, setaverageusdprice] = useState();

    function avrage_price_to_usd() {
        setaverageusdprice(priceAPIData.data.USD * collection?.stats?.seven_day_average_price)
    }

    const [floorusdprice, setfloorusdprice] = useState();

    function floor_price_to_usd() {
        setfloorusdprice(priceAPIData.data.USD * collection?.stats?.floor_price)
    }


    const [switchcurrency, setswitchcurrency] = useState(false);
    const currencyToggle = () => {
        setswitchcurrency(current => !current);
    }

    const [switchcurrencytoeth, setswitchcurrencytoeth] = useState(true);
    const currencyToggletoeth = () => {
        setswitchcurrencytoeth(current => !current);
    }
    const [toggleClass, settoggleClass] = useState(true);
    const toogleicon = () => {

        settoggleClass(current => !current);
    };

    const [l1, setL1] = useState(0);
    const [l2, setL2] = useState(0);
    const [l3, setL3] = useState(0);
    const [percentileMonitoring, setPercentileMonitoring] = useState(0);
    useEffect(() => {
        setL1(localStorage.getItem('percentile10'));
        setL2(localStorage.getItem('percentile50'));
        setL3(localStorage.getItem('percentile90'));
    }, [percentileMonitoring])

    return (
        <div>
            <GlobalStyles/>
            <Head>
                {collection && (
                    <title>{`${collectionName}`} NFT Floor Price & Stats</title>
                )}
                {collection && (
                    <meta
                        name="title"
                        content={`${collectionName} NFT Floor Price & Stats`}
                    ></meta>
                )}
            </Head>
            <section className="container no-bottom">
                <div className="row">
                    <div className="col-lg-12">
                        <span>
                            <span className="timestamp">Collections/</span>
                            {collection && <span>{collectionName}</span>}
                        </span>
                    </div>
                    <div className="col-12">
                        <div className="card  main-stat-card p-2">
                            {collection && (
                                <div className="row">
                                    <img
                                        className="col-sm-12 col-md-12 col-lg-4"
                                        src={collection.image_url}
                                        alt=""
                                    ></img>
                                    <div
                                        className="col-md-12 col-sm-12 col-lg-8 d-flex flex-column justify-content-between p-3">
                                        <div className="d-flex">
                                            <h1 className="col-md-8 col-sm-8 coll-main-title">{`${collectionName} NFT Floor Price & Stats`}</h1>
                                            <div className="col-4 flex-column pull-right ">
                                                <Button
                                                    onClick={() => {
                                                        price_to_usd();
                                                        avrage_price_to_usd();
                                                        floor_price_to_usd();
                                                        currencyToggle();
                                                        currencyToggletoeth();
                                                        toogleicon();
                                                    }}
                                                    className="btn-main "
                                                    style={{
                                                        marginTop: "-1px",
                                                        borderRadius: "10px",
                                                        height: "40px",
                                                        color: "#ffff",
                                                        backgroundColor: "#00AC4F",
                                                        float: "right"


                                                    }}
                                                >
                                                    <i className={!toggleClass ? 'fab fa-ethereum mr-1' : 'fas fa-dollar-sign mr-1'}></i>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="d-flex col-12 flex-wrap">
                                            <SmallStat
                                                className="col-md-4 col-sm-12"
                                                heading={numberWithCommas(
                                                    collection?.stats?.seven_day_sales
                                                )}
                                                text="Number of NFT's sold"
                                                time="Last 7 days"
                                            />
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={numberWithCommas(
                                                    numFormatter(
                                                        collection?.stats?.seven_day_volume)
                                                )}
                                                //{numberWithCommas(collection?.stats?.seven_day_volume)}
                                                text="Trading Volume"
                                                time="Last 7 days"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fas fa-dollar-sign mr-1"></i>}
                                                heading={numberWithCommas(
                                                    numFormatter(
                                                        usdprice)
                                                )}
                                                text="Trading Volume"
                                                time="Last 7 days"
                                            />}
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={numberWithCommas(
                                                    collection?.stats?.seven_day_average_price
                                                )}
                                                //{numberWithCommas(collection?.stats?.seven_day_average_price)}
                                                text="Average Price"
                                                time="Last 7 days"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fas fa-dollar-sign mr-1"></i>}
                                                heading={numberWithCommas(
                                                    numFormatter(
                                                        averageusdprice)
                                                )}
                                                //{numberWithCommas(collection?.stats?.seven_day_average_price)}
                                                text="Average Price"
                                                time="Last 7 days"
                                            />}

                                            <SmallStat
                                                className="col-md-4 col-sm-12"
                                                heading={numberWithCommas(
                                                    collection?.stats?.num_owners
                                                )}
                                                text="Total Owners"
                                                time="Number of owners"
                                            />
                                            <SmallStat
                                                className="col-md-4 col-sm-12"
                                                heading={numberWithCommas(
                                                    collection?.stats?.total_supply
                                                )}
                                                text="Total Supply"
                                                time="Number of tokens"
                                            />
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={
                                                    collection?.stats?.floor_price !== null
                                                        ? numFormatter(collection?.stats?.floor_price.toFixed(3))
                                                        : "---"
                                                }
                                                //(collection?.stats?.floor_price !== null) ? (collection?.stats?.floor_price.toFixed(4)) : ("---")
                                                text="Floor Price"
                                                time="Lowest Ask Price"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-md-4 col-sm-12"
                                                icon={<i className="fas fa-dollar-sign mr-1"></i>}
                                                heading={
                                                    collection?.stats?.floor_price !== null
                                                        ? numFormatter(floorusdprice.toFixed(3))
                                                        : "---"
                                                }
                                                //(collection?.stats?.floor_price !== null) ? (collection?.stats?.floor_price.toFixed(4)) : ("---")
                                                text="Floor Price"
                                                time="Lowest Ask Price"
                                            />}
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={`${numFormatter(l1)}`}
                                                text="10th  percentile  price"
                                                time="Last 7 days"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                heading={`$${numberWithCommas(
                                                    numFormatter(
                                                        percentileToUsd(l1)
                                                    )
                                                )}`}
                                                text="10th  percentile  price"
                                                time="Last 7 days"
                                            />}
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={`${numFormatter(l2)}`}
                                                text="Median price"
                                                time="Last 24 days"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                heading={`$${numberWithCommas(
                                                    numFormatter(
                                                        percentileToUsd(l2)
                                                    )
                                                )}`}
                                                text="Median price"
                                                time="Last 24 days"
                                            />}
                                            {switchcurrencytoeth && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                icon={<i className="fab fa-ethereum mr-1"></i>}
                                                heading={`${numFormatter(l3)}`}
                                                text="90th  percentile  price"
                                                time="Price of NFT"
                                            />}
                                            {switchcurrency && <SmallStat
                                                className="col-sm-12 col-md-4"
                                                heading={`$${numberWithCommas(
                                                    numFormatter(
                                                        percentileToUsd(l3)
                                                    )
                                                )}`}
                                                text="90th  percentile  price"
                                                time="Price of NFT"
                                            />}

                                        </div>

                                        <h4 className="col-12 mt-4">About</h4>
                                        {collection ? (
                                            <p className="col-12">
                                                {collection.name} NFTs were sold{" "}
                                                {numberWithCommas(collection.stats?.seven_day_sales)}{" "}
                                                times in the last 7 days. The total sales volume for{" "}
                                                {collection.name} was
                                                {[
                                                    " ",
                                                    collection.stats?.total_volume
                                                        ? numFormatter(collection.stats?.total_volume)
                                                        : `--`,
                                                ]}
                                                . The average price of one {collection.name} was
                                                {collection.stats?.average_price
                                                    ? numberWithCommas(collection.stats?.average_price)
                                                    : `--`}
                                                . There are{" "}
                                                {collection.stats?.num_owners
                                                    ? numberWithCommas(
                                                        numFormatter(collection.stats?.num_owners)
                                                    )
                                                    : `--`}{" "}
                                                {collection.name} owners, owning a total supply of{" "}
                                                {collection.stats?.count
                                                    ? numberWithCommas(
                                                        numFormatter(collection.stats?.count)
                                                    )
                                                    : `--`}{" "}
                                                NFTs.
                                                {/*<br />
                              <br />
                              {collection.name} launched as a fixed set of{" "}
                              {collection.stats?.total_supply? numberWithCommas(
                                numFormatter(collection.stats?.total_supply)
                              ) :
            `--`
        }{" "}
                              items in {moment(collection.created_date).year} and became
                              one of the inspirations for the{" "}
                              {collection.primary_asset_contracts && collection?.primary_asset_contracts[0]?.schema_name}{" "}
                              standard. They have been featured in places like New York
                              Times, Christie's of London, Art|Basel Miami, and The PBS
                              NewsHour.*/}
                                            </p>
                                        ) : null}

                                        <div className="d-flex col-12 gap-2" style={{flexWrap: 'wrap'}}>
                                            {collection?.external_url && (
                                                <SocialIcon
                                                    title="Website"
                                                    icon="fa-solid fa-blog"
                                                    link={collection.external_url}
                                                />
                                            )}
                                            {collection?.twitter_username && (
                                                <SocialIcon
                                                    title="Twitter"
                                                    icon="fa fa-twitter"
                                                    link={`https://twitter.com/${collection.twitter_username}`}
                                                />
                                            )}
                                            {collection?.discord_url && (
                                                <SocialIcon
                                                    title="Discord"
                                                    icon="fa fa-discord"
                                                    link={collection.discord_url}
                                                />
                                            )}
                                            {collection?.instagram_username && (
                                                <SocialIcon
                                                    title="Instagram"
                                                    icon="fa fa-instagram"
                                                    link={`https://www.instagram.com/${collection.instagram_username}`}
                                                />
                                            )}
                                            {collection?.telegram_url && (
                                                <SocialIcon
                                                    title="Telegram"
                                                    icon="fa fa-telegram"
                                                    link={collection.telegram_url}
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="btn_chart_group">
                    <button className="btn_table">All</button>
                    <button className="btn_table">30d</button>
                    <button className="btn_table">60d</button>
                    <button className="btn_table">90d</button>
                </div>
                <div>
                    {sales.length ? <SalesChart sales={sales}/> : <></>}
                </div>
            </section>

            <section className="container no-bottom">
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            {collection && <h2>{`Recent ${collectionName} Sales`}</h2>}
                            <p className="timestamp">Last 24 Hours</p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <CarouselCollectionRecent slug={slug}/>
                    </div>
                </div>
            </section>


            <section className="" style={{background: "#ebf0f4"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                {collection && <h2>{`Top Selling ${collectionName} NFTs `}</h2>}
                                <p className="timestamp">Last 24 Hours</p>
                            </div>
                        </div>
                    </div>
                    <CarouselCollectionNftTop setPercentileMonitoring={setPercentileMonitoring} slug={slug}/>
                </div>
            </section>


            <div className={arrTwitterChartData.length === 0 ? "hide" : ""}>
                <section className="container no-bottom ">
                    {collection && <h2>{`${collectionName} Twitter Followers`}</h2>}
                    <TwitterChart
                        color={["#05D2FF"]}
                        name="Followers"
                        data={arrTwitterChartData}
                    />
                </section>
            </div>

            <section className="container">
                <div className={arrDiscardChartData.length === 0 ? "hide" : ""}>
                    <section className="container no-bottom ">
                        {collection && <h2>{`${collectionName} Discord Follwers`}</h2>}
                        <TwitterChart
                            color={["#6d28ff"]}
                            name="Followers"
                            data={arrDiscardChartData}
                        />
                    </section>
                </div>
            </section>

            <section className="container">
                <h2>Frequently Asked Questions (FAQ)</h2>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            <h3 className="mb-0">{`What is a ${collectionName}?`}</h3>
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingOne"
                    >
                        <div className="accordion-body">
                            <p>{`${collectionName} is a NFT (Non-fungible token) collection. A collection of digital artwork stored on the blockchain.`}</p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                        >
                            <h3 className="mb-0">{`How many ${collectionName} tokens exist?`}</h3>
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                    >
                        <div className="accordion-body">
                            <p>{`In total there are 10,000 ${collectionName} NFTs. Currently ${collectionOwners} owners have at least one ${collectionName} NTF in their wallet.`}</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                        >
                            <h3 className="mb-0">{`What was the most expensive ${collectionName} sale?`}</h3>
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                    >
                        <div className="accordion-body">
                            <p>{`The most expensive ${collectionName} sold was ${collectionName}#${latest_sale_token_id}. it was sold for `}
                                <i className="fab fa-ethereum mr-1"></i>{`${latest_sale_total_price} on ${latest_sale_date}`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseFour"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseFour"
                        >
                            <h3 className="mb-0">{`How many ${collectionName} were sold recently?`}</h3>
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingFour"
                    >
                        <div className="accordion-body">
                            <p>{`There were ${thirty_day_sales + ` ` + collectionName
                            } sold in the last 30 days.`}</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseFive"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseFive"
                        >
                            <h3 className="mb-0">{`How much does a ${collectionName} cost?`}</h3>
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingFive"
                    >
                        <div className="accordion-body">
                            <p>{`In the last 30 days, the cheapest ${collectionName} sales were below $${nft_Lowest_Price}. and the highest sales were for over $${nft_Highest_Price}. The median price for ${collectionName} was $${Median} in the last 30 days.`}</p>
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-between align-items-center mobile-flex-wrap mt-5">
                    <span
                        className=" btn-main "
                        style={{visibility: prevCollection?.Name ? "visible" : "hidden"}}
                        onClick={handlePrevCollection}
                    >
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        {prevCollection?.Name}
                    </span>
                    <span
                        className=" btn-main"
                        style={{visibility: nextCollection?.Name ? "visible" : "hidden"}}
                        onClick={handleNextCollection}
                    >
                        {nextCollection?.Name}
                        <i className="fa-solid fa-arrow-right ml-2"></i>
                    </span>
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps({params}) {
    const res = await fetch(
        `${server.baseUrl}${server.collections}/getCollectionDetail/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const resHighestLowest = await fetch(
        `${server.baseUrl}/nft/get-cheaper-and-expensive-nft/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const twitterChartRequest = await fetch(
        `${server.baseUrl}/collection/getTwitterData/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );

    const priceAPIRequest = await fetch(
        `${server.baseUrl}/get-eth-stats`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const salesDataAPIRequest = await fetch(
        `${server.baseUrl}/collection/getSalesData/${params.slug}/all`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );
    const discardDataAPIRequest = await fetch(
        `${server.baseUrl}/collection/getDiscordData/${params.slug}`,
        {
            method: "GET", // or 'PUT'
            headers: {
                [`${server.header.key}`]: `${server.header.value}`,
            },
        }
    );


    const serverCollection = await res.json();
    const priceAPIData = await priceAPIRequest.json();
    const twitterChartData = await twitterChartRequest.json();
    const salesData = await salesDataAPIRequest.json();
    const discardData = await discardDataAPIRequest.json();
    const resHighestLowestValues = await resHighestLowest.json();
    if (serverCollection.data.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            serverCollection,
            resHighestLowestValues,
            twitterChartData,
            salesData,
            discardData,
            priceAPIData,
        },
    };
}

export default Collections;
