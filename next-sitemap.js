/** @type {import('next-sitemap').IConfig} */
const siteurl = "https://www.nftprice.zone";


module.exports = {
    siteUrl: siteurl,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/explore2','/Author','/collections','/home5','/listing','/rarity','/rarity/__index'],
    robotsTxtOptions: {
        additionalSitemaps: [`${siteurl}/blog-sitemap.xml`,`${siteurl}/collections-sitemap.xml`]
    },
    sourceDir: 'build'
}