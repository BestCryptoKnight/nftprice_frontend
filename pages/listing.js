// import React from 'react';
// import Footer from '../components/footer';
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyles = createGlobalStyle`
// //   header#myHeader.navbar.sticky.white {
// //     background: #403f83;
// //     border-bottom: solid 1px #403f83;
// //   }
// //   header#myHeader.navbar .search #quick_search{
// //     color: #fff;
// //     background: rgba(255, 255, 255, .1);
// //   }
// //   header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
// //     color: #fff;
// //   }
// //   header#myHeader .dropdown-toggle::after{
// //     color: rgba(255, 255, 255, .5);
// //   }
// //   header#myHeader .logo .d-block{
// //     display: none !important;
// //   }
// //   header#myHeader .logo .d-none{
// //     display: block !important;
// //   }
// //   @media only screen and (max-width: 1199px) {
// //     .navbar{
// //       background: #403f83;
// //     }
// //     .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
// //       background: #fff;
// //     }
// //     .item-dropdown .dropdown a{
// //       color: #fff !important;
// //     }
// //   }


// .list-item-image{
//     max-width: 265px;
//     width: 100%;
// }

// .list-item-status{
//     padding: 1rem;
//     max-height: 29px;
//     max-width: fit-content;
//     color: white;
//     font-size: 14px;
//     border-radius: 5px;
// }

// .list-item-status.promoted{
//     background: #6D28FF;
// }

// .list-item-status.verified{
//     background: #04D5D5;
// }

// .white-spacer{
//     background: white;
//     margin-top: -10rem;
// }

// .top-blockchain-list{
//     list-style: none;
// }

// .blockchain-icon{
//     font-size: 30px;
//     width: 35px;
//     margin-right: 1rem;
// }

// .card-border{
//     border-radius: 13px;
// }

// .tag-item{
//     font-size: 14px;
// }
// `;

// const Listing = function () {

//     const listings = [
//         {
//             image: "./img/listings/wall-street-chads.webp",
//             heading: "Wall Street Chads – DAO / Decentralized Investment Platform",
//             startDate: "Feb 13, 2022",
//             endDate: "Feb 27, 2022",
//             status: "Promoted",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fesi  ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non.",
//         },
//         {
//             image: "./img/listings/crypto-monster-lab.webp",
//             heading: "Wall Street Chads – DAO / Decentralized Investment Platform",
//             startDate: "Feb 13, 2022",
//             endDate: "Feb 27, 2022",
//             status: "Promoted",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fesi  ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non.",
//         },
//         {
//             image: "./img/listings/timeless-ape-club.webp",
//             heading: "Timeless Ape Club – $350,000 Giveaways",
//             startDate: "Feb 13, 2022",
//             endDate: "Feb 27, 2022",
//             status: "Verified",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fesi  ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non.",
//         },
//         {
//             image: "./img/listings/timeless-ape-club2.webp",
//             heading: "Timeless Ape Club – $350,000 Giveaways",
//             startDate: "Feb 13, 2022",
//             endDate: "Feb 27, 2022",
//             status: "Promoted",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fesi  ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non.",
//         },
//         {
//             image: "./img/listings/timeless-ape-club3.webp",
//             heading: "Timeless Ape Club – $350,000 Giveaways",
//             startDate: "Feb 13, 2022",
//             endDate: "Feb 27, 2022",
//             status: "Promoted",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fesi  ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non.",
//         }
//     ];

//     const blockchains = [
//         {
//             icon: "./img/blockchains/ethereum.webp",
//             title: "Ethereum",
//             count: 706
//         },
//         {
//             icon: "./img/blockchains/binance.webp",
//             title: "Binance Smart Chain",
//             count: 673
//         },
//         {
//             icon: "./img/blockchains/avax.webp",
//             title: "Avax Network",
//             count: 566
//         },
//         {
//             icon: "./img/blockchains/tezos.webp",
//             title: "Tezos",
//             count: 440
//         },
//         {
//             icon: "./img/blockchains/coronos.webp",
//             title: "Coronos",
//             count: 236
//         },
//         {
//             icon: "./img/blockchains/solana.webp",
//             title: "Solana",
//             count: 158
//         },
//         {
//             icon: "./img/blockchains/polygon.webp",
//             title: "Polygon",
//             count: 87
//         },
//         {
//             icon: "./img/blockchains/cardano.webp",
//             title: "Cardano",
//             count: 54
//         },
//         {
//             icon: "./img/blockchains/elrond.webp",
//             title: "Elrond",
//             count: 26
//         },
//         {
//             icon: "./img/blockchains/vchain.webp",
//             title: "Vchain",
//             count: 6
//         }
//     ];

//     const tags=["music","sports","art","collectible","game","metaverse","deffi","dao","charity","rewards","auction",
// "giveaway","generative","collab","photo"];


//     return (
//         <div>
//             <GlobalStyles />

//             <section className='container'>
//                 <div className='row'>
//                     <div className='col-lg-12'>
//                         <div >
//                             <h2>Today's Top  NFT  Drops</h2>
//                         </div>
//                     </div>
//                     <div className='col-12 d-flex justify-content-between'>
//                         <div className='col-6 d-flex p-0'>
//                             <button className='btn-main mr-2'>Today</button>
//                             <button className='btn-main mr-2'>Upcoming</button>
//                             <button className='btn-main mr-2'>Ongoing</button>
//                             <button className='btn-main mr-2'>Newest</button>
//                         </div>
//                         <div className='col-2'>
//                             <button className='btn-main'>
//                                 All Filters
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section style={{ background: "#D9E0EC33" }}>
//                 <div className='container'>
//                     <div className='row'>




//                         <div className="col-md-8">

//                             {listings?.map((item, index) => (
//                                 <ul className='activity-list' index={index + 1} key={index}>
//                                     <li className='listing-item d-flex'>
//                                         <div className='col-5'>
//                                             <img className='list-item-image' src={item.image} alt="" />

//                                         </div>
//                                         <div className='col-7'>
//                                             <div className="d-flex w-100 flex-wrap flex-column">
//                                                 <h4>{item.heading}</h4>
//                                                 <div>{item.startDate}-{item.endDate}</div>
//                                                 <span className="act_list_date">
//                                                     10/07/2021, 12:40
//                                                 </span>
//                                                 <div className={`list-item-status p-1 ${item.status === 'Promoted' ? `promoted` : `verified`}`}>
//                                                     <p>{item.status}</p>
//                                                 </div>
//                                                 {/* <button className='btn-main'>{item.status}</button> */}
//                                                 <i className="bi bi-check"></i>
//                                                 <p>
//                                                     {item.description}
//                                                 </p>
//                                                 <button className='btn-main'>Read More</button>
//                                             </div>
//                                         </div>

//                                     </li>
//                                 </ul>
//                             ))}
//                                 <button className='btn-main lead m-auto mt-5'>Load More</button>

//                         </div>



//                         <div className="col-md-4">
//                             <div className='card card-border p-3 pb-0'>
//                                 <h3>Top Blockchains</h3>
//                                 <ul className='d-flex flex-column top-blockchain-list'>
//                                     {blockchains?.map((item,index)=>(
//                                         <li className='d-flex align-items-center mb-3' index={index+1} key={index}>
//                                             <img className={`blockchain-icon`} src={item.icon} alt=""></img>
//                                             <p className='m-0'>{item.title} ({item.count})</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div className='card card-border p-3 pb-0 mt-3'>
//                                 <h3>Popular Tags</h3>
//                                 <ul className='d-flex flex-column top-blockchain-list'>
//                                     {tags?.map((item,index)=>(
//                                         <li className='d-flex align-items-center mb-1' index={index+1} key={index}>
//                                             <a className='m-0 text-dark tag-item' href='/listing'>#{item}</a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className='white-spacer'></section>


//             <Footer />
//         </div>

//     );
// }

// export default Listing;

import React from 'react'

function listing() {
  return (
    <div>listing</div>
  )
}

export default listing