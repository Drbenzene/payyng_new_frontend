// import { useEffect } from "react";

// const ChatwootWidget = () => {
//   useEffect(() => {
//     (function (d, t) {
//       const BASE_URL = "https://app.chatwoot.com";
//       const g: any = d.createElement(t),
//         s: any = d.getElementsByTagName(t)[0];
//       g.src = BASE_URL + "/packs/js/sdk.js";
//       g.defer = true;
//       g.async = true;
//       s.parentNode.insertBefore(g, s);
//       g.onload = function () {
//         window?.chatwootSDK?.run({
//           websiteToken: `<WEBSITE_TOKEN>`, //please add your website token here
//           baseUrl: BASE_URL,
//         });
//       };
//     })(document, "script");
//   }, []);

//   return null;
// };

// export default ChatwootWidget;
