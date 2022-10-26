import Document, { Html, Head, Main, NextScript } from 'next/document'



class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <title>BabaBoota</title>
    <meta name="description" content="Buy Car Accessories online in Pakistan for car decoration &amp; modifications. Get new Automotive Car Parts and Accessories online. Explore a wide range of Car auto parts, best car accessories online, in this Car parts online Shop. Pakistan most reliable auto store." />
    <meta name="keywords" />
    <meta name="viewport" content="width=device-width" />
    <link rel="shortcut icon" href="/fav.png" type="image/x-icon" />
    <link rel="manifest" href="/manifest.json" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="apple-touch-icon" href="/fav.png" />
    <link rel="icon" sizes="192x192" href="/fav.png" />


        <link href="/css/jquery-ui.min.css" rel="stylesheet" type="text/css" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link type="text/css" href="/css/owl.carousel.min.css" rel="stylesheet" />
    <link type="text/css" href="/css/easy-responsive-tabs.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/swiper-bundle.min.css"/>

        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/js/jquery.min.js" />
      <script src="/js/bootstrap.bundle.min.js" />
          <script src="/js/jquery-3.1.1.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/jquery-ui-1.12.1.min.js"></script>
    <script  src="/js/nav.js" />
    <script src="/js/owl.carousel.min.js"></script>
    <script  src="/js/easyResponsiveTabs.js" />
    <script src="/js/swiper-bundle.min.js"></script>


  
        </body>

      </Html>
    )
  }
}

export default MyDocument
