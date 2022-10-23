import React from 'react'
import Header from '../menu/header'
import Footer from '../components/footer'
import ScrollToTop from '../menu/ScrollToTop'
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;
const Layout = ({ children }) => {
    return (
        <div className='wraper'>
            <div id='routerhang'>
                <GlobalStyles/>
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
            </div>
        </div>
    )
}

export default Layout