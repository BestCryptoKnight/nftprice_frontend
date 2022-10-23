import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ColumnNewRedux from '../components/components/ColumnNewRedux';
import Footer from '../components/components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../components/store/selectors';
import { fetchAuthorList } from "../components/store/actions/thunks";
import api from "../components/core/api";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = ({ authorId }) => {
const [openMenu, setOpenMenu] = React.useState(true);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [openMenu2, setOpenMenu2] = React.useState(false);
const handleBtnClick = () => {
  setOpenMenu(!openMenu);
  setOpenMenu1(false);
  setOpenMenu2(false);
  document.getElementById("Mainbtn").classList.add("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick1 = () => {
  setOpenMenu1(!openMenu1);
  setOpenMenu2(false);
  setOpenMenu(false);
  document.getElementById("Mainbtn1").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick2 = () => {
  setOpenMenu2(!openMenu2);
  setOpenMenu(false);
  setOpenMenu1(false);
  document.getElementById("Mainbtn2").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
};

const dispatch = useDispatch();
const authorsState = useSelector(selectors.authorsState);
const author = authorsState.data ? authorsState.data[0] : {};

useEffect(() => {
  dispatch(fetchAuthorList(authorId));
}, [dispatch, authorId]);

return (
<div>
<GlobalStyles/>
  { author.banner && 
    <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${api.baseUrl + author.banner.url})`}}>
      <div className='mainbreadcumb'>
      </div>
    </section>
  }

  <section className='container no-bottom'>
    <div className='row'>
      <div className="col-md-12">
         <div className="d_profile de-flex">
              <div className="de-flex-col">
                  <div className="profile_avatar">
                    { author.avatar && 
                      <img src={api.baseUrl + author.avatar.url} alt="" style={{backgroundImage: `url(${api.baseUrl + author.banner.url})`}}/>
                    }
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                          <h4>
                            {author.username}                                          
                              <span className="profile_username">{author.social}</span>
                              <span id="wallet" className="profile_wallet">{author.wallet}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                      </div>
                  </div>
              </div>
              <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                  </div>
                  <div className="de-flex-col">
                      <span className="btn-main">Follow</span>
                  </div>
              </div>

          </div>
      </div>
    </div>
  </section>

  <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                <ul className="de_nav text-left">
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                    <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                    <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Liked</span></li>
                </ul>
            </div>
          </div>
        </div>
      {openMenu && author.id && (  
        <div id='zero1' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu1 && author.id && ( 
        <div id='zero2' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu2 && ( 
        <div id='zero3' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false}/>
        </div>
      )}
      </section>


  <Footer />
</div>
);
}
export default memo(Colection);