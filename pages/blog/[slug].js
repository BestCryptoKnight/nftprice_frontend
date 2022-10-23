import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {createGlobalStyle} from 'styled-components';
import * as selectors from "../../components/store/selectors";
import {
  getBlogPostSingle,
  getRecentPosts,
  getBlogComments,
  getBlogTags,
} from "../../components/store/actions/thunks";
import api from "../../components/core/api";
import moment from "moment";
// import CarouselNewRedux from "../components/CarouselNewReduxNew";
import Head from 'next/head'
function createMarkup(element) {
  return { __html: element };
}

const NewsSingle = ({ post }) => {
  const dispatch = useDispatch();
  const blogsState = useSelector(selectors.blogsStateSingle);
  // const recentPostsState = useSelector(selectors.recentPostsState);
  // const tagsState = useSelector(selectors.tagsState);
  // const commentsState = useSelector(selectors.commentsState);

  // const blogPost = blogsState?.data?  blogsState.data[0] : {};
  const blogPost = post[0];

  // const recentPosts = recentPostsState?.data ? recentPostsState.data : [];
  // const tags = tagsState?.data ? tagsState.data : [];
  // const comments = commentsState?.data ? commentsState.data.comments : [];
  // const commentCount = commentsState?.data ? commentsState.data.counts : 0;

  useEffect(() => {
    // dispatch(getBlogPostSingle(slug));
    // dispatch(getRecentPosts());
    // dispatch(getBlogTags(postId));
    // dispatch(getBlogComments(postId));
  }, []);

  return (
    <div>
      <Head>
        <title>{blogPost?.yoast_head_json?.title}</title>
        <meta
          name="title"
          content={blogPost?.yoast_head_json?.title}
        ></meta>
        <meta
          name="description"
          content={blogPost?.yoast_head_json?.description}
        ></meta>
      </Head>

      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 p-5 bg-white br-15">
              {blogPost ? (
                <>
                <h2 dangerouslySetInnerHTML={createMarkup(blogPost?.title?.rendered)}></h2>
                  <div className="post-text mb-2">
                    <span className="post-date">
                      {moment(blogPost?.date).format("MMMM D, yyyy")}
                    </span>
                    {/* <span className="post-comment">{commentCount}</span> */}
                    {/* <span className="post-like">{blogPost?.likes}</span> */}
                  </div>
                  {/* {blogPost?.cover &&
                                <img alt="" src={api.baseUrl + blogPost?.cover.url} className="img-fullwidth rounded" />
                            } */}
                  <div className="post-text">
                    {/* <p>{blogPost?.content}</p> */}
                  </div>
                  {blogPost && (
                    <div
                      className="blog-read"
                      dangerouslySetInnerHTML={createMarkup(
                        blogPost?.content?.rendered
                      )}
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="row">
            <section
              className="container no-bottom"
              style={{ background: "#ebf0f4", maxWidth: "100%" }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h3>Other similar posts</h3>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://blog.nftsales.net/wp-json/wp/v2/posts?slug=${params.slug}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
}

export default memo(NewsSingle);
