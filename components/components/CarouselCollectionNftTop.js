import React, { memo, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as selectors from "../../components/store/selectors";
// import * as actions from "../../components/store/actions/thunks";
// import { clearNfts, clearFilter } from "../../components/store/actions";
// import { shuffleArray } from "../../components/store/utils";
import styled from "styled-components";
import { server } from "../core/api";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { numberWithCommas, numFormatter } from "../../utils/customFunctions";
import moment from "moment";
import Loader from "./Loader/Loader";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const getDays = (val) => {
  var given = moment(val);
  var current = moment();

  //Difference in number of days
  return current.diff(given, 'days');
};

//react functional component
const CarouselCollectionNftTop = ({
  showLoadMore = true,
  shuffle = false,
  authorId = null,
  setPercentileMonitoring
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [height, setHeight] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [loading, setLoading] = useState(true);
  // const [percentile10, setPercentile10] = useState(0);
  // const [percentile50, setPercentile50] = useState(0);
  // const [percentile90, setPercentile90] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    // dispatch(actions.fetchNftsBreakdown(authorId));
    const fetchData = async () => {
      setLoading(true);
      const nftList = await fetch(
        `${server.baseUrl}/nft/getNfts/${slug}/${page}/12`,
        {
          method: "GET", // or 'PUT'
          headers: {
            [`${server.header.key}`]: `${server.header.value}`,
          },
        }
      );

      const nftListResponse = await nftList.json();
      setNfts(nftListResponse.data);
      setPageCount(nftListResponse.meta.pageCount);
      setLoading(false);
      let l1 = Number(nftListResponse.meta.percentle10.$numberDecimal) / (10 ** 18)
      let l2 = Number(nftListResponse.meta.percentle50.$numberDecimal) / (10 ** 18)
      let l3 = Number(nftListResponse.meta.percentle90.$numberDecimal) / (10 ** 18)
      // setPercentile10(l1.toFixed(3));
      // setPercentile50(l2.toFixed(3));
      // setPercentile90(l3.toFixed(3));

      console.log('_______________________________')
      console.log(l1.toFixed(3))
      console.log(l2.toFixed(3))
      console.log(l3.toFixed(3))
      console.log('_______________________________')
      localStorage.setItem('percentile10', l1.toFixed(3));
      localStorage.setItem('percentile50', l2.toFixed(3));
      localStorage.setItem('percentile90', l3.toFixed(3));
      setPercentileMonitoring(l1.toFixed(3));
      console.log("nftList");
      console.log(nftList);
    };

    fetchData();
  }, [page, slug]);

  const navigate = useRouter();
  const navigateTo = (link) => {
    navigate.push(link);
  }


  const handlePageClick = async (data) => {
    setPage(data.selected + 1);
  };
  // const handleItemClick = (url) => {

  // }
  const LargeStat = (props) => {
    return (
      <div
        className={`${props.className} mt-1 mb-2`}
      >
        <div className={`card d-flex flex-column justify-content-center align-items-center stat-detail-card p-4`}>
          <div className="stat-detail-heading-l m-0">{props.heading}</div>
          <div className="stat-detail-text-l m-0">{props.text}</div>
          <div className="stat-detail-time-l">{props.time}</div>
        </div>
      </div>
    );
  };


  return (
    <div>
      <div className="contianer">
        <div className="grid_nft">
          {nfts?.length > 0 && !loading ?
            nfts.map((nft, index) => (
              <div className=""
                // index={index + 1} 
                key={index}>
                <div className="d-item" onClick={() => navigateTo(nft.data.permalink)}>
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <Outer>
                        <span>
                          <img
                            src={nft.data.image_url}
                            className="lazy nft__item_preview"
                            onLoad={onImgLoad}
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            alt=""
                          />
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                      <span onClick={() => window.open("/#", "_self")}>
                        <div className="nft__item_name">{nft.data.name}</div>
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
            )) : loading ? <Loader /> : <div className="text-center my-2"> No Data Available</div>}

        </div>
        {nfts?.length > 0 && !loading ? <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          initialPage={page - 1}
        /> : null}
      </div>
    </div>
  );
};

export default memo(CarouselCollectionNftTop);
