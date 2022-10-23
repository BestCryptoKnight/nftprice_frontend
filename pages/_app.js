import React from "react";
import "../components/assets/animated.css";
import 'font-awesome/css/font-awesome.min.css';
import 'elegant-icons/style.css';
import 'et-line/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/assets/style.scss';
// import '../components/assets/style_grey.scss';
//redux store
import { Provider } from 'react-redux'
import store from '../components/store';
//Layout
import Layout from "../components/Layout/Layout";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default function App({ Component, pageProps }) {

  React.useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}