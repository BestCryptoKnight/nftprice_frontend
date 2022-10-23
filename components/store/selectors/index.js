import { createSelector, createStructuredSelector } from "reselect";


//Store Selectors
export const nftBreakdownState = (state) => state.NFT.nftBreakdown;
export const nftRarityState = (state) => state.NFT.nftRarity;
export const nftRarityDetailState = (state) => state.NFT.nftRarityDetail;
export const nftShowcaseState = (state) => state.NFT.nftShowcase;
export const nftDetailState = (state) => state.NFT.nftDetail;
export const hotCollectionsState = (state) => state.hotCollection.hotCollections;
export const authorsState = (state) => state.authors.authorList;
export const topNftCollections = (state) => state.collections.topCollections;
export const authorRankingsState = (state) => state.authors.authorRanking;

//blogs
export const blogsState = (state) => state.blogs.blogPosts;
export const blogsStateSingle = (state) => state.blogs.singlePost;
export const recentPostsState = (state) => state.blogs.recentPosts;
export const tagsState = (state) => state.blogs.tags;
export const commentsState = (state) => state.blogs.comments;

export const auctionedNfts = createSelector(nftBreakdownState, ( nfts ) => {
    if(!nfts.data) {
        return [];
    }
    const acutioned = nfts.data.filter(nft => !!nft.deadline);
    return acutioned;
});

export const nftFilter = createStructuredSelector({
    categories: (state) => state.filters.selectedCategories,
    status: (state) => state.filters.selectedStatus,
    itemsType: (state) => state.filters.selectedItemsType,
    collections: (state) => state.filters.selectedCollections,
    nftTitle: (state) => state.filters.filterNftTitle
});

export const nftItems = createSelector(nftFilter, nftBreakdownState, ( filters, nfts ) => {
    let { data } = nfts;
    const { categories, status, itemsType, collections, nftTitle } = filters;

    if(!data) {
        return [];
    }

    if(categories.size) {
        data = data.filter( nft => categories.has(nft.category));
    }
    if(status.size) {
        data = data.filter( nft => status.has(nft.status));
    }
    if(itemsType.size) {
        data = data.filter( nft => itemsType.has(nft.item_type));
    }
    if(collections.size) {
        data = data.filter( nft => collections.has(nft.collections));
    }
    if(nftTitle.trim().length) {
        let pattern = new RegExp(`${nftTitle.trim()}`, 'gi');
        console.log(pattern)
        data = data.filter( nft => nft.title.match(pattern));
    }

    return data;
});
