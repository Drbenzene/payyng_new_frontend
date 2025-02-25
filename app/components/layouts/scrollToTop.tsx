// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const ScrollToTop = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       window.scrollTo(0, 0);
//     };

//     // Scroll to top when the route changes
//     router.push
//     router?.events?.on("routeChangeComplete", handleRouteChange);

//     // Cleanup listener on unmount
//     return () => {
//       router?.events?.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router]);

//   return null;
// };

// export default ScrollToTop;
