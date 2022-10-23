const api = {
    baseUrl: '/mock_data', //mock data base folder

    nfts: '/nfts.json',
    nftShowcases: '/nft_showcases.json',
    authors: '/authors.json',
    authorsSales: '/author_ranks.json',
    hotCollections: '/hot-collections.json',
    contactUs: '/contact-forms',
    blogs: '/blog-posts',
    recent: '/blog-posts/recent.json',
    comments: '/blog-posts/comments.json',
    tags: '/blog-posts/tags.json',
}

export const openseaApi = {
    base: 'https://testnets.opensea.io',
    api: 'https://testnets-api.opensea.io',
}

export const wordpressApi = {
    baseUrl: 'https://blog.nftsales.net/wp-json/wp/v2',
    posts: '/posts',
    postWithSlug: '/posts?slug='
}

export const server = {
    SITEURL: 'https://nftprice.zone',
    baseUrl: 'https://api.nftprice.zone',
    collections: '/collection',
    home: '/home',
    header: {
        key: "x-api-key",
        value: "6b1eae10-73c8-4e3d-a336-008f56e4f883"
    }
}

// export const server = {
//     baseUrl: 'http://localhost:8080',
//     collections: '/collection',
//     header: {
//         key: "x-api-key",
//         value: "6b1eae10-73c8-4e3d-a336-008f56e4f883"
//     }
// }

export default api;
