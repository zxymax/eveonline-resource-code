import React from 'react'
// import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
// import _startsWith from 'lodash/startsWith'
import getConfig from 'config/web'

const { gtmId } = getConfig()

// const scriptPageHidingSnippet = `
// (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
// h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
// (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
// })(window,document.documentElement,'async-hide','dataLayer',4000,
// {'GTM-52CTHKC':true});`

// const scriptOptimizeGA = `(function(i,s,o,g,r,a,m)
// {i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// ga('create','UA-45583206-2', 'auto');
// ga('require', 'GTM-52CTHKC');`

const scriptInnerHTML = `${
    '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":' +
    'new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],' +
    'j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=' +
    '"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);' +
    '})(window,document,"script","dataLayer","'
}${gtmId}");`

// 2019-01-10|GPS - Second GTM container
// const scriptInnerHTML_2 = `${'(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":' +
//     'new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],' +
//     'j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=' +
//     '"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);' +
//     '})(window,document,"script","dataLayer","GTM-TKW8HR9'}");`

const script = [
    // { type: 'text/javascript', innerHTML: scriptPageHidingSnippet },
    // { type: 'text/javascript', innerHTML: scriptOptimizeGA },
    { type: 'text/javascript', innerHTML: scriptInnerHTML },
    // { type: 'text/javascript', innerHTML: scriptInnerHTML_2 },
]

const GTM = () => <Helmet script={script} />

export default GTM
