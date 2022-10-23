import React from 'react';
import Link from 'next/link';

const NavLink = props => (
    <Link{...props}>
        <a id={props.id}>
            {props.children}
        </a>
    </Link>
);

const footer = () => (
    <footer className="footer-light">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="widget">
                        <img alt="NFT Sales logo" className="f-logo d-1 mb-3 main-logo" src="/img/logo.svg" />
                        <p>The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</p>
                        <div className="de-flex-col">
                            <div className="social-icons">
                                <span onClick={() => window.open("", "_self")}><i className="fa fa-facebook fa-lg"></i></span>
                                <span onClick={() => window.open("", "_self")}><i className="fa fa-twitter fa-lg"></i></span>
                                <span onClick={() => window.open("", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>NFT Rankings</h5>
                        <ul>
                            <li><NavLink href="#">Top Trending Collections</NavLink></li>
                            <li><NavLink href="#">Top New Collections</NavLink></li>
                            <li><NavLink href="#">Top Collections last 30 days</NavLink></li>
                            <li><NavLink href="#">New Collectins launched recently</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>NFT Information</h5>
                        <ul>
                            <li><NavLink href="#">NFT Help Articles</NavLink></li>
                            <li><NavLink href="#">NFT Rarity Explorer</NavLink></li>
                            <li><NavLink href="#">Upcoming NFT launches</NavLink></li>
                            <li><NavLink href="#">ChainText</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>Stay in The Loop</h5>
                        <p>Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating NFTs.</p>
                        <form action="#" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                            <div className="col text-center">
                                <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" />
                                <NavLink href="#" id="btn-subscribe">
                                    <i className="arrow_right bg-color-secondary"></i>
                                </NavLink>
                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="subfooter">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex justify-content-center">
                            <div className="de-flex-col">
                                <span onClick={() => window.open("", "_self")}>
                                    <span className="copy">&copy; Copyright 2022 - NFT Price</span>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
export default footer;