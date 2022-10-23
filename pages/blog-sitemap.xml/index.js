
import {getServerSideSitemap} from 'next-sitemap';

const siteurl = "https://www.nftprice.zone";
export async function getServerSideProps(ctx){

    const result = await fetch("https://blog.nftsales.net/wp-json/wp/v2/posts");
    const res = await result.json();


    const count = result?.headers.get('x-wp-totalpages');

    let finalFields = [];

    for(let i=1;i<=count;i++)
    {
        const pageResult = await fetch(`https://blog.nftsales.net/wp-json/wp/v2/posts?page=${i}&offset=${10*(i-1)}`);
        const pageRes = await pageResult.json();

        let fields = pageRes.map((item)=>({
            loc: `${siteurl}/blog/${item.slug}/`,
            lastmod: `${new Date(item.modified).toISOString()}`,
        }));

        finalFields = [...finalFields,...fields];

    }

    return getServerSideSitemap(ctx,finalFields);
}

export default function Site(){};
