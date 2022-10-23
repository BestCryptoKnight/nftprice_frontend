import React, { memo, useEffect,useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../components/store/selectors';
import { getBlogPosts } from "../../components/store/actions/thunks";
import moment from "moment";
import SliderMain from "../../components/components/NewsPageSlider";
import ReactPaginate from "react-paginate";
import { useRouter } from 'next/router';
import Link from 'next/link';

function createMarkup(element) {
  return { __html: element };
}
const NavLink = props => (
  <Link{...props}>
  <a id={props.id}>
  {props.children}
  </a>
  </Link>
);

const Blog = ({posts}) => {
  const router = useRouter();
  const page = router?.query?.page ?? 1;

  const limit = 6;
  const navigateTo = (link) => {
    router.push(link);
  }

  const dispatch = useDispatch();
  const blogData = useSelector(selectors.blogsState).data;
  const blogPosts = posts;

  const [pageCount, setPageCount] = React.useState(0);

  if (blogData?.headers['x-wp-totalpages'] && pageCount === 0)
    setPageCount(blogData?.headers['x-wp-totalpages'])

  const [currentPage, setCurrentPage] = React.useState(1);
  const offset = 6;
  const scrollRef = useRef();


  useEffect(() => {
    dispatch(getBlogPosts(currentPage, limit, offset * currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = async (data) => {

    if (parseInt(data.selected + 1) !== 1) {
      router.push({
        pathname: '/blog',
        query: { page: data.selected + 1},
      })
    }
    else
    {
      router.push({
        pathname: '/blog'
      })
    }
  };


  return (
        <div>
          <section className="jumbotron breadcumb no-bg bwhite" style={{ backgroundImage: `url(${'./img/background/12.jpg'})` }}>
            <div className='row'>
              <SliderMain />
            </div>
          </section>


          <section style={{ background: '#ebf0f4' }}>
            <div className='container'>


              <div className="row" ref={scrollRef}>
                {blogPosts?.map((post, index) => (
                  <div className="col-lg-4 col-md-6 mb30" key={index}>
                    <div className="bloglist item p-3 bg-white br-15" role="button" onClick={() => navigateTo(`/blog/${post.slug}`)}>
                      <div className="post-content">
                        <div className="post-image">
                          {/* <img alt="" src={api.baseUrl + blog.cover.url} className="lazy"/> */}
                        </div>
                        <div className="post-text">
                          <span className="p-date">{moment(post.date).format('L, LT')}</span>
                          <h4><span dangerouslySetInnerHTML={createMarkup(post.title.rendered)}></span></h4>
                          <div dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="spacer-single"></div>

                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  initialPage={page-1}
                />

              </div>
            </div>
          </section >
        </div >
  )
};

export async function getServerSideProps({query}) {
  const page = query?.page?? 1;
  const val = 6;
  const offset = val * (page-1);
  const res = await fetch(`https://blog.nftsales.net/wp-json/wp/v2/posts?page=${page}&per_page=${val}&offset=${offset}`)
  const posts = await res.json();


  return {
    props: {
      posts,
    },
  }
}

export default memo(Blog);