function createMarkup(element) {
  return { __html: element };
}

const About = ({ about }) => {

  return (
    <section className="container">
      <div dangerouslySetInnerHTML={createMarkup(about[0]?.content?.rendered)}></div>
    </section>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://blog.nftsales.net/wp-json/wp/v2/pages?slug=about`)
  let about = await res.json()
  about = JSON.stringify(about);
  about = about.replace("NFTSales.net", "NFTPrice.zone");
  about = JSON.parse(about);
  return {
    props: {
      about,
    },
  }
}

export default About;