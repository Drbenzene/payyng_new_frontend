import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import StoreLinks, { BtnTypes } from "../common/StoreLinks";

function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensure the animation triggers only once
    threshold: 0.5, // Trigger the animation when 50% of the section is in view
  });

  return (
    <motion.section
      ref={ref}
      initial={{ y: 100, opacity: 0 }} // Start below and with zero opacity
      animate={{
        y: inView ? 0 : 100, // Slide up when in view
        opacity: inView ? 1 : 0, // Fade in when in view
      }}
      transition={{ duration: 0.5 }}
      className="bg-black"
    >
      <div className="flex max-w-7xl flex-col px-8 py-12 text-gray-300 lg:px-12 xl:m-auto">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          <div>
            <img
              className="mb-4 w-36"
              src="/logo.png"
              alt="Light version of Payyng logo"
            />
            <p>
              Payments and International Remittance made easy and fun for
              Nigerians.{" "}
            </p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Product</p>
              <a href="#hero">Overview</a>
              <a href="#features">Features</a>
              <a href="#reviews">Reviews</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Resources</p>
              <a href="milto:support@payyng.com">Support</a>
            </div>
          </div>
          <div className="w-fit">
            <h2>Get the app</h2>
            <StoreLinks type={BtnTypes.Variant} />
          </div>
        </div>
        <div className="mt-14 flex justify-between border-t-2 border-t-gray-700 pt-10">
          <p className="w-[16ch] text-gray-400 md:w-full">
            &copy; {new Date().getFullYear()} Payyng. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://twitter.com/payynghq" target="_blank">
              <img src="/assets/logos/icons8-twitterx.svg" alt="Twitter logo" />
            </a>
            <a href="https://www.facebook.com/payynghq" target="_blank">
              <img
                src="/assets/logos/icons8-facebook.svg"
                alt="Facebook logo"
              />
            </a>
            <a href="https://www.linkedin.com/payynghq" target="_blank">
              <img
                src="/assets/logos/icons8-linkedin.svg"
                alt="Linkedin logo"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Footer;
