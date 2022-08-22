import React, { FC, useEffect } from "react";

interface LikeShareFacebookProps {
  href: string;
}

const LikeShareFacebook: FC<LikeShareFacebookProps> = ({ href }) => {
  useEffect(() => {
    const initFacebookSDK = () => {
      const window1: any = window as any;
      if (window1 && window1.FB) {
        window1.FB.XFBML.parse();
      }

      window1.fbAsyncInit = function () {
        window1.FB.init({
          appId: process.env.NEXT_PUBLIC_FB_APP_ID,
          cookie: true, // enable cookies to allow the server to access
          // the session
          xfbml: true, // parse social plugins on this page
          version: "v2.5", // use version 2.1
        });
      };
      // Load the SDK asynchronously
      (function (d, s, id) {
        var js: any,
          fjs: any = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/vi_VN/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };
    initFacebookSDK();
  }, []);
  return (
    <>
      <div
        className='fb-like'
        data-href={`https://developers.facebook.com/docs/plugins${href}`}
        data-width=''
        data-layout='standard'
        data-action='like'
        data-size='small'
        data-share='true'
      ></div>
    </>
  );
};

export default LikeShareFacebook;
