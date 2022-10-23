import React, { memo } from "react";

const CustomSlide = ({ index, avatar, banner, username, uniqueId, collectionId }) => {
  return (
    <div className='itm'
    // index={index}
    >
      <div className="nft_coll">
        <div className="nft_wrap">
          <span><img src={banner} className="lazy img-fluid" alt="" /></span>
        </div>
        <div className="nft_coll_pp">
          <span onClick={() => window.open("/colection/" + collectionId, "_self")}><img className="lazy" src={avatar} alt="" /></span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <span onClick={() => window.open("/colection/" + collectionId, "_self")}><h4>{username}</h4></span>
          <span>{uniqueId}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(CustomSlide);