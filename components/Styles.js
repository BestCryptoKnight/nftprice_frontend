import { createGlobalStyle } from 'styled-components';

// export const StyledHeader = styled(Header)`
// ${props => props.theme === 'GREY' && '.navbar { background: red; }'}`;
// const newHeader = Header;

// export const StyledHeader = styled(newHeader)`
//    .navbar {
//        background: red !important;
//    } 
// `;

export const StyledHeader = createGlobalStyle`
    ${props => props.theme === 'GREY' && `
        header#myHeader.navbar.sticky.white {
            background: #212428;
            border-bottom: 0;
            box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
        }
        header#myHeader.navbar .search #quick_search{
            color: #fff;
            background: rgba(255, 255, 255, .1);
        }
        header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
            color: #fff;
        }
        header#myHeader .dropdown-toggle::after{
            color: #fff;
        }
        header#myHeader .logo .d-block{
            display: none !important;
        }
        header#myHeader .logo .d-none{
            display: none !important;
        }
        header#myHeader .logo .d-4{
            display: block !important;
        }
        .navbar .search #quick_search{
            border-radius: 20px;
        }
        .navbar .navbar-item .lines {
            border-bottom: 2px solid #ff343f;
        }
        .navbar .mainside a{
            text-align: center;
            color: #fff !important;
            background: #ff343f;
            border-radius: 30px;
        }
        .navbar .mainside a:hover {
            box-shadow: 2px 2px 20px 0 #ff343f;
            transition: all .3s ease;
        }
        .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
            background: #fff;
        }
        .item-dropdown{
            color: #fff !important;
            background: rgba(33, 36, 40, .9);
            box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1);
        }
        .item-dropdown .dropdown a{
            color: #fff !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .item-dropdown .dropdown a:hover{
            color: #fff !important;
            background: #ff343f;
        }
        footer.footer-light .subfooter span img.d-1{
            display: none !important;
        }
        footer.footer-light .subfooter span img.d-4{
            display: inline-block !important;
        }
        .de_countdown{
            right: 10px;
            color: #fff;
        }
        .author_list_pp{
            margin-left:0;
        }
        footer.footer-light .subfooter{
            border-top: 1px solid rgba(255,255,255,.1);
        }
        #scroll-to-top div {
            background: #ff343f;
        }
        @media only screen and (max-width: 1199px) { 
            .navbar {
                background: #212428;
            }
        }
    `}

    ${props => props.theme === 'GREYLOGIN' && `
        header#myHeader.navbar.sticky.white {
        background: #212428;
        border-bottom: 0;
        box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
        }
        header#myHeader.navbar .search #quick_search{
        color: #fff;
        background: rgba(255, 255, 255, .1);
        }
        header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
        color: #fff;
        }
        header#myHeader .dropdown-toggle::after{
        color: #fff;
        }
        header#myHeader .logo .d-block{
        display: none !important;
        }
        header#myHeader .logo .d-none{
        display: none !important;
        }
        header#myHeader .logo .d-4{
        display: block !important;
        }
        .navbar .search #quick_search{
        border-radius: 20px;
        }
        .navbar .navbar-item .lines {
        border-bottom: 2px solid #ff343f;
        }
        .navbar .mainside a{
        text-align: center;
        color: #fff !important;
        background: #ff343f;
        border-radius: 30px;
        }
        .navbar .mainside a:hover {
        box-shadow: 2px 2px 20px 0 #ff343f;
        transition: all .3s ease;
        }
        .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
        background: #fff;
        }
        .item-dropdown{
        color: #fff !important;
        background: rgba(33, 36, 40, .9);
        box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1);
        }
        .item-dropdown .dropdown a{
        color: #fff !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .item-dropdown .dropdown a:hover{
        color: #fff !important;
        background: #ff343f;
        }
        footer.footer-light .subfooter span img.d-1{
        display: none !important;
        }
        footer.footer-light .subfooter span img.d-4{
        display: inline-block !important;
        }
        .de_countdown{
        right: 10px;
        color: #fff;
        }
        .author_list_pp{
        margin-left:0;
        }
        footer.footer-light .subfooter{
        border-top: 1px solid rgba(255,255,255,.1);
        }
        #scroll-to-top div {
        background: #ff343f;
        }
        .mainside{
        .connect-wal{
        display: none;
        }
        .logout{
        display: flex;
        align-items: center;
        }
        .de-menu-notification .d-count{
        background: #FF343F;
        }
        .de-menu-notification .popshow span.viewaall, .de-menu-profile .popshow .d-name span.name{
        color: #FF343F;
        }
        .de-menu-profile .popshow .d-wallet #btn_copy:hover{
        background: #FF343F;
        }
        }
        @media only screen and (max-width: 1199px) { 
        .navbar {
        background: #212428;
        }
        }
    `}

    ${props => props.theme === 'BlACK' && `
        //WRITE HEADER STYLE FOR BlACK HERE
    `}
`;