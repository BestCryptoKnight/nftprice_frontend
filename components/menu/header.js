import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
//import { header } from 'react-bootstrap';
import Link from 'next/link';
import useOnclickOutside from "react-cool-onclickoutside";
import { Links } from "./Menu";

setDefaultBreakpoints([
    { xs: 0 },
    { l: 1199 },
    { xl: 1200 }
]);

const NavLink = props => (
    <Link{...props}>
        <a>
            {props.children}
        </a>
    </Link>
);

const NavItems = () => {
    return (
        <div className='menu'>
            {
                Links.map((link, index) => {
                    return <div className='navbar-item' key={index}>
                        <NavLink href={link.to}>
                            <>
                                {link.name}
                                <span className='lines'></span>
                            </>
                        </NavLink>
                    </div>
                })
            }
        </div>
    );
}


const Header = function ({ className }) {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
    };
    const handleBtnClick2 = () => {
        setOpenMenu2(!openMenu2);
    };
    const handleBtnClick3 = () => {
        setOpenMenu3(!openMenu3);
    };
    const closeMenu = () => {
        setOpenMenu(false);
    };
    const closeMenu1 = () => {
        setOpenMenu1(false);
    };
    const closeMenu2 = () => {
        setOpenMenu2(false);
    };
    const closeMenu3 = () => {
        setOpenMenu3(false);
    };

    const ref = useOnclickOutside(() => {
        closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
        closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
        closeMenu2();
    });
    const ref3 = useOnclickOutside(() => {
        closeMenu3();
    });


    const [showmenu, btn_icon] = useState(false);
    const [showpop, btn_icon_pop] = useState(false);
    const [shownot, btn_icon_not] = useState(false);
    const closePop = () => {
        btn_icon_pop(false);
    };
    const closeNot = () => {
        btn_icon_not(false);
    };
    const refpop = useOnclickOutside(() => {
        closePop();
    });
    const refpopnot = useOnclickOutside(() => {
        closeNot();
    });

    useEffect(() => {
        const header = document.getElementById("myHeader");
        const totop = document.getElementById("scroll-to-top");
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
            btn_icon(false);
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
                totop.classList.add("show");

            } else {
                header.classList.remove("sticky");
                totop.classList.remove("show");
            }
            if (window.pageYOffset > sticky) {
                closeMenu();
            }
        });
        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    }, []);
    return (
        <header className={`navbar white ${className}`} id="myHeader">
            <div className='container'>
                <div className='row w-100-nav'>
                    <div className='logo px-0'>
                        <div className='navbar-title navbar-item'>
                            <NavLink href="/">
                                <img
                                    src="/img/logo.svg?v=1.1"
                                    className="img-fluid d-block main-logo"
                                    alt="NFT Sales logo"
                                />
                            </NavLink>
                        </div>
                    </div>

                    <div className='search'>
                        <input id="quick_search" className="xs-hide" name="quick_search"
                            placeholder="search item here..." type="text" />
                    </div>

                    <BreakpointProvider>
                        <Breakpoint l down>
                            {showmenu && <NavItems />}
                        </Breakpoint>

                        <Breakpoint xl>
                            <NavItems />
                        </Breakpoint>
                    </BreakpointProvider>

                    <div className='mainside d-flex align-items-center'>

                        <div className="logout">
                            {/* <NavLink href="/createOptions">Create</NavLink> */}
                            <div id="de-click-menu-notification" className="de-menu-notification"
                                onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                                <div className="d-count">8</div>
                                <i className="fa fa-bell"></i>
                                {shownot &&
                                    <div className="popshow">
                                        <div className="de-flex">
                                            <h4>Notifications</h4>
                                            <span className="viewaall">Show all</span>
                                        </div>
                                        <ul>
                                            <li>
                                                <div className="mainnot">
                                                    <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                                                    <div className="d-desc">
                                                        <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                                                        <span className="d-time">1 hour ago</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mainnot">
                                                    <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                                                    <div className="d-desc">
                                                        <span
                                                            className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                                                        <span className="d-time">2 hours ago</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mainnot">
                                                    <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                                                    <div className="d-desc">
                                                        <span
                                                            className="d-name"><b>Lori Hart</b> started following you</span>
                                                        <span className="d-time">18 hours ago</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mainnot">
                                                    <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                                                    <div className="d-desc">
                                                        <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                                                        <span className="d-time">1 day ago</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mainnot">
                                                    <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                                                    <div className="d-desc">
                                                        <span
                                                            className="d-name"><b>Karla Sharp</b> started following you</span>
                                                        <span className="d-time">3 days ago</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div id="de-click-menu-profile" className="de-menu-profile"
                                onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                                {/* <img src="../../img/author_single/author_thumbnail.jpg" alt="" /> */}
                                {showpop &&
                                    <div className="popshow">
                                        <div className="d-name">
                                            <h4>Monica Lucas</h4>
                                            <span className="name"
                                                onClick={() => window.open("", "_self")}>Set display name</span>
                                        </div>
                                        <div className="d-balance">
                                            <h4>Balance</h4>
                                            12.858 ETH
                                        </div>
                                        <div className="d-wallet">
                                            <h4>My Wallet</h4>
                                            <span id="wallet"
                                                className="d-wallet-address">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                                            <button id="btn_copy" title="Copy Text">Copy</button>
                                        </div>
                                        <div className="d-line"></div>
                                        <ul className="de-submenu-profile">
                                            <li>
                                                <span>
                                                    <i className="fa fa-user"></i> My profile
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-pencil"></i> Edit profile
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa fa-sign-out"></i> Sign out
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
                    <div className="menu-line white"></div>
                    <div className="menu-line1 white"></div>
                    <div className="menu-line2 white"></div>
                </button>

            </div>
        </header>
    );
}
export default Header;
