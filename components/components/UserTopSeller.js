import React, { memo } from 'react';
import api from '../../components/core/api';

//react functional component
const UserTopSeller = ({ user }) => {
    return (
        <>
            <div className="author_list_pp">
              <span onClick={()=> window.open("", "_self")}>
                  <img className="lazy" src={api.baseUrl + user.avatar.url} alt=""/>
                  <i className="fa fa-check"></i>
              </span>
            </div>                                    
            <div className="author_list_info">
                <span onClick={()=> window.open("", "_self")}>{user.username}</span>
                <span className="bot">{user.author_sale.sales} ETH</span>
            </div>   
        </>     
    );
};

export default memo(UserTopSeller);