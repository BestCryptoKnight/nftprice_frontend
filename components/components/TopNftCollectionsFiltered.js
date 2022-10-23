import React, { memo, useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../components/store/selectors";
import { fetchTopCollections } from "../../components/store/actions/thunks/topCollections";
import TopNftCollectionCard from "./TopNftCollectionCard";
import Loader from "./Loader/Loader";
import TopNftCollectionTable from "./TopNftCollectionsTable"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { server } from "../../components/core/api";
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Axios } from "../../components/core/axios";

const GlobalStyles = createGlobalStyle`
 .top-collection-list-item{
    border-width: 1px;
    border-style: solid;
    border-color: transparent transparent rgb(229, 232, 235);
 }
    
`;
const TopNftCollectionsFiltered = () => {
  const dispatch = useDispatch();
  const topCollectionsState = useSelector(selectors.topNftCollections);
  const topCollections = topCollectionsState?.data?.data?.data
    ? topCollectionsState.data.data.data
    : [];
  const [time, setTime] = useState("1d");
  const [loading, setLoading] = useState(true);

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const [categoriesFilterData, setCategoriesFilterData] = useState([
    {
      index: 1,
      name: 'Art'
    },
    {
      index: 2,
      name: 'Derivatives'
    },
    {
      index: 3,
      name: 'Gaming'
    },
    {
      index: 4,
      name: 'Historical'
    },
    {
      index: 5,
      name: 'Membership'
    },
    {
      index: 6,
      name: 'Metaverse'
    },
    {
      index: 7,
      name: 'PFP/Avatar'
    },
  ]);
  const [categoriesFilterData_, setCategoriesFilterData_] = useState([])

  const [collectionsFilterData, setCollectionsFilterData] = useState([{
    index: 1,
    name: 'Art Blocks'
  },
  {
    index: 2,
    name: 'Art Blocks Curated'
  },
  {
    index: 3,
    name: 'Art Blocks Factory'
  },
  {
    index: 4,
    name: 'Art Blocks Playground'
  },
  {
    index: 5,
    name: 'Braindrops'
  },
  {
    index: 6,
    name: 'Decentraland Market'
  },
  {
    index: 7,
    name: 'Digital Zone of Immaterial Pictorial Sensibility'
  },
  {
    index: 8,
    name: 'Euler Beats'
  },
  {
    index: 9,
    name: 'gm studio'
  },
  {
    index: 10,
    name: 'Goblintown'
  },
  {
    index: 11,
    name: 'Loot'
  },
  {
    index: 12,
    name: 'MetaHero'
  },
  {
    index: 13,
    name: 'Neo Tokyo'
  },
  {
    index: 14,
    name: 'PROOF COLLECTIVE'
  },
  {
    index: 15,
    name: 'RTFKT'
  },
  {
    index: 16,
    name: 'The Gutter'
  },
  {
    index: 17,
    name: 'The Sandbox Market'
  },
  {
    index: 18,
    name: 'VeeFriends'
  },
  ]);
  const [collectionsFilterData_, setCollectionsFilterData_] = useState([]);

  const [creatorsFilterData, setCreatorsFilterData] = useState([{
    index: 1,
    name: '0N1 FORCE LLC'
  },
  {
    index: 2,
    name: '0xmons'
  },
  {
    index: 3,
    name: '10KTF'
  },
  {
    index: 4,
    name: '3Landers'
  },
  {
    index: 5,
    name: 'AAA'
  },
  {
    index: 6,
    name: 'Aaron Penne'
  },
  {
    index: 7,
    name: 'Adidas Originals'
  },
  {
    index: 8,
    name: 'AKT Studio'
  },
  {
    index: 9,
    name: 'Akuma'
  },
  {
    index: 10,
    name: 'Al Cabones'
  },]);
  const [creatorsFilterData_, setCreatorsFilterData_] = useState([])

  const [chainsFilterData, setChainsFilterData] = useState([{
    index: 1,
    name: 'Ethereum'
  },
  {
    index: 2,
    name: 'Polygon'
  },
  ]);
  const [chainsFilterData_, setChainsFilterData_] = useState([])

  const [showlist, setShowList] = useState(true);
  const handleShow = () => {
    setShowList(!showlist);

  }

  const AddCategoriesFilterData_ = (index) => {
    let data = categoriesFilterData.splice(index, 1)
    setCategoriesFilterData([...categoriesFilterData]);
    setCategoriesFilterData_([...categoriesFilterData_, data[0]]);

  }

  const RemoveCategoriesFilterData_ = (index) => {
    let data = categoriesFilterData_.splice(index, 1)
    setCategoriesFilterData_([...categoriesFilterData_]);
    setCategoriesFilterData([...categoriesFilterData, data[0]]);

  }

  const AddCollectionsFilterData_ = (index) => {
    let data = collectionsFilterData.splice(index, 1)
    setCollectionsFilterData([...collectionsFilterData]);
    setCollectionsFilterData_([...collectionsFilterData_, data[0]]);

  }

  const RemoveCollectionsFilterData_ = (index) => {
    let data = collectionsFilterData_.splice(index, 1)
    setCollectionsFilterData_([...collectionsFilterData_]);
    setCollectionsFilterData([...collectionsFilterData, data[0]]);

  }

  const AddCreatorsFilterData_ = (index) => {
    let data = creatorsFilterData.splice(index, 1)
    setCreatorsFilterData([...creatorsFilterData]);
    setCreatorsFilterData_([...creatorsFilterData_, data[0]]);

  }

  const RemoveCreatorsFilterData_ = (index) => {
    let data = creatorsFilterData_.splice(index, 1)
    setCreatorsFilterData_([...creatorsFilterData_]);
    setCreatorsFilterData([...creatorsFilterData, data[0]]);

  }

  const AddChainsFilterData_ = (index) => {
    let data = chainsFilterData.splice(index, 1)
    setChainsFilterData([...chainsFilterData]);
    setChainsFilterData_([...chainsFilterData_, data[0]]);

  }

  const RemoveChainsFilterData_ = (index) => {
    let data = chainsFilterData_.splice(index, 1)
    setChainsFilterData_([...chainsFilterData_]);
    setChainsFilterData([...chainsFilterData, data[0]]);

  }
  const [etherPrice, setEtherPrice] = useState(0)
  useEffect(() => {
    dispatch(fetchTopCollections("1d"));
    localStorage.setItem('collection_time', time);
    setLoading(false);
    const fetchEtherPrice = async () => {

      const data = await Axios.get(
        `${server.baseUrl}/get-eth-stats`, {
        params: {},
        headers: {
          [`${server.header.key}`]: `${server.header.value}`,
        },
      }
      );
      setEtherPrice(data.data.data.USD);

    };
    fetchEtherPrice();
  }, [dispatch]);

  const [toggleIcon, settoggleIcon] = useState(true);
  const [payUnite, setPayUinte] = useState(true);
  const handleicon = () => {
    setPayUinte(current => !current);
    settoggleIcon(current => !current);
  };


  return (
    <>
      {!showlist && <div className="display_show mobile_back_show">
        <button className="show_in_bottom" onClick={handleShow}>Select</button>
      </div>}
      <GlobalStyles />
      <section className="container no-bottom">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <div className="d-flex justify-content-center align-items-center mb-5">
                <h3 className="m-0 pr-1">Top Collections Over</h3>
                <p className="top-nft-select">
                  {(time == "1d") ? ("last 24 hours") : (time == "7d") ? ("last 7 days") : ("last 30 days")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 btn_table_container">
            <div className="btn_table_group">
              {/* <div className="" style={{ position: 'relative' }}>
                <button className="btn_table" >
                  <StarBorderIcon />
                </button>
                
              </div>
              <div className="display_show">
                <button className="btn_table" onClick={handleShow}>
                  <FilterAltIcon />
                </button>
              </div>
              <div className={`categories-filter ${showlist && 'display_none'}`} >
                <div className="" style={{ position: 'relative' }}>
                  <button className="btn_table" >
                    Categories
                    <div className="filter-list-body">
                      <div className="filtered_list">
                        {categoriesFilterData_.map((item, index) => (
                          <div key={index} className="filtered" onClick={() => RemoveCategoriesFilterData_(index)}>{item.name}&nbsp;<CancelIcon fontSize="small" /></div>
                        ))}
                      </div>
                      {
                        categoriesFilterData.map((item, index) => (
                          <div key={index} className="name" onClick={() => AddCategoriesFilterData_(index)}>
                            <div>
                              {item.name}
                            </div>
                            <div className="" style={{ color: 'green' }}>✔</div>
                          </div>

                        ))
                      }
                    </div>
                  </button>
                </div>
              </div>
              <div className={`collection-filter ${showlist && 'display_none'}`} >
                <div className="" style={{ position: 'relative' }}>
                  <button className="btn_table" >
                    Collections
                    <div className={`filter-list-body`}>
                      <div className="filtered_list">
                        {collectionsFilterData_.map((item, index) => (
                          <div key={index} className="filtered" onClick={() => RemoveCollectionsFilterData_(index)}>{item.name}&nbsp;<CancelIcon fontSize="small" /></div>
                        ))}
                      </div>
                      {
                        collectionsFilterData.map((item, index) => (
                          <div key={index} className="name" onClick={() => AddCollectionsFilterData_(index)}>{item.name}</div>
                        ))
                      }
                    </div>
                  </button>

                </div>
              </div>
              <div className={`creator-filter ${showlist && 'display_none'}`}>
                <div className="" style={{ position: 'relative' }}>
                  <button className="btn_table" >
                    Creators
                    <div className={`filter-list-body`}>
                      <div className="filtered_list">
                        {creatorsFilterData_.map((item, index) => (
                          <div key={index} className="filtered" onClick={() => RemoveCreatorsFilterData_(index)}>{item.name}&nbsp;<CancelIcon fontSize="small" /></div>
                        ))}
                      </div>
                      {
                        creatorsFilterData.map((item, index) => (
                          <div key={index} className="name" onClick={() => AddCreatorsFilterData_(index)}>{item.name}</div>
                        ))
                      }
                    </div>
                  </button>

                </div>
              </div>
              <div className={`chains-filter ${showlist && 'display_none'}`}>
                <div className="" style={{ position: 'relative' }}>
                  <button className="btn_table" >
                    Chains
                    <div className={`filter-list-body`}>
                      <div className="filtered_list">
                        {chainsFilterData_.map((item, index) => (
                          <div key={index} className="filtered" onClick={() => RemoveChainsFilterData_(index)}>{item.name}&nbsp;<CancelIcon fontSize="small" /></div>
                        ))}
                      </div>
                      {
                        chainsFilterData.map((item, index) => (
                          <div key={index} className="name" onClick={() => AddChainsFilterData_(index)}>{item.name}</div>
                        ))
                      }
                    </div>
                  </button>

                </div>
              </div> */}
            </div>
            <div className="btn_table_group">
              <select
                className="btn_table"
                value={time}
                onChange={handleTimeChange}
              >
                <option value={"1d"}>24h</option>
                <option value={"7d"}>7d </option>
                <option value={"30d"}>30d</option>
              </select>
              <button className="btn_table" onClick={() => { handleicon() }}>
                <i className={toggleIcon ? 'fab fa-ethereum ml-1' : 'fas fa-dollar-sign ml-1'}></i><ExpandMoreIcon style={{ 'fontSize': '19px' }} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="col-12">
            <div>
              {loading || !etherPrice ? (
                <Loader />
              ) : (
                <TopNftCollectionTable topCollections={topCollections} time={time} payUnite={payUnite} etherPrice={etherPrice} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(TopNftCollectionsFiltered);
