import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title: string;
  description: string;
  image: string;
  adsense?: any;
}

const Meta: FC<MetaProps> = ({ title, description, image, adsense }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta
        name='google-site-verification'
        content='FrZhN97-g4Y7dQ1rGs311xhVxdQmof6fTYqe627-Eww'
      />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
      {/* <script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v14.0&appId=865699914335033&autoLogAppEvents=1'
        nonce='Dp8F1UgF'
      ></script> */}
      {/* {adsense && <script async src={adsense} crossOrigin='anonymous'></script>} */}
    </Head>
  );
};

export default Meta;
