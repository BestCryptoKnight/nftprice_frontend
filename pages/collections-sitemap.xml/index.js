
import {getServerSideSitemap} from 'next-sitemap';
import {server} from "../../components/core/api";
const siteurl = "https://www.nftprice.zone";
export async function getServerSideProps(ctx){

    const result = await fetch(`${server.baseUrl}${server.collections}/getCollections-sitemap`, {
        method: 'GET', // or 'PUT'
        headers: {
            [`${server.header.key}`]: `${server.header.value}`
        },
    });
    const res = await result.json();

    const slugs = res.data[0].slugs;

    let finalFields = [];

    for(let i=0;i<slugs.length;i++)
    {

        let fields = [{
            loc: `${siteurl}/collections/${slugs[i]}/`,
            lastmod: `${new Date().toISOString()}`,
        }];

        finalFields = [...finalFields,...fields];

    }

    return getServerSideSitemap(ctx,finalFields);
}

export default function Site(){};
