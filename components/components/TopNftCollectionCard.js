import React, { memo } from "react";
import api from "../../components/core/api";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
//react functional component

const GlobalStyles = createGlobalStyle`
 .top-nft-collection-card-trade{
    border-width: 1px;
    border-style: solid;
    border-color: transparent transparent rgb(229, 232, 235);
 }

 .top-nft-collection-card-name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:space-between;
 }
 .top-collection-card-value{
        display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
 }
    
`;
const TopNftCollectionCard = ({ collection, time }) => {
    const navigate = useRouter();

    const navigateTo = (link) => {
        navigate.push(link);
    };

    const getColor = (value) => {
        if (parseFloat(value) < 0) return "red";
        else if (parseFloat(value) > 0) return "green";
    };

    return (
        <>
            <GlobalStyles />
            <Link href={`/collections/${collection.slug}`} passHref>
                <div onClick={() => navigateTo(`/collections/${collection.slug}`)}>
                    <div className="author_list_pp">
                        <span onClick={() => window.open("", "_self")}>
                            <img className="lazy" src={collection.image_url} alt="" />
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="author_list_info d-flex">
                        <div className="col-5 top-nft-collection-card-name">
                            <span onClick={() => window.open("", "_self")}>
                                {collection.name}
                            </span>
                            <span className="bot">Floor price: <i className="fab fa-ethereum"></i>
                                {" "}{(collection.stats.floor_price !== null) ? (collection.stats.floor_price.toFixed(2)) : ("---")}{" "}</span>
                        </div>
                        <div className="col-5 top-collection-card-value text-right">
                            {time === "1d" && (
                                <span
                                    className="top-nft-collection-card-trade"
                                    style={{ color: getColor(collection.stats.one_day_change) }}
                                >
                                    {collection.stats.one_day_change >= 0 ? `+` : ``}
                                    {parseFloat(collection.stats.one_day_change * 100).toFixed(2)}
                                    %
                                </span>
                            )}
                            {time === "7d" && (
                                <span
                                    className="top-nft-collection-card-trade"
                                    style={{ color: getColor(collection.stats.seven_day_change) }}
                                >
                                    {collection.stats.seven_day_change >= 0 ? `+` : ``}
                                    {parseFloat(collection.stats.seven_day_change * 100).toFixed(
                                        2
                                    )}
                                    %
                                </span>
                            )}
                            {time === "30d" && (
                                <span
                                    className="top-nft-collection-card-trade"
                                    style={{
                                        color: getColor(collection.stats.thirty_day_change),
                                    }}
                                >
                                    {collection.stats.thirty_day_change >= 0 ? `+` : ``}
                                    {parseFloat(collection.stats.thirty_day_change * 100).toFixed(
                                        2
                                    )}
                                    %
                                </span>
                            )}

                            {time === "1d" && (
                                <span className="bot">
                                    <i className="fab fa-ethereum"></i>{" "}
                                    {parseFloat(collection.stats.one_day_volume).toFixed(2)}
                                </span>
                            )}
                            {time === "7d" && (
                                <span className="bot">
                                    <i className="fab fa-ethereum"></i>{" "}
                                    {parseFloat(collection.stats.seven_day_volume).toFixed(2)}
                                </span>
                            )}
                            {time === "30d" && (
                                <span className="bot">
                                    <i className="fab fa-ethereum"></i>{" "}
                                    {parseFloat(collection.stats.thirty_day_volume).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default memo(TopNftCollectionCard);
