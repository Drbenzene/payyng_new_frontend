import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensure the animation triggers only once
    threshold: 0.5, // Trigger the animation when 50% of the section is in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }} // Start below and with zero opacity
      animate={{
        y: inView ? 0 : 30, // Slide up when in view
        opacity: inView ? 1 : 0, // Fade in when in view
      }}
      transition={{ duration: 0.5 }}
      className="bg-black w-screen"
    >
      <section
        id="features"
        className="flex max-w-7xl flex-col gap-10 px-8 py-10 lg:px-12 xl:m-auto xl:pt-20"
      >
        <article className="m-auto w-[30ch] text-center text-gray-500 md:m-0 md:w-full">
          <h2 className="mb-4 text-4xl font-semibold text-white">
            Make every penny count
          </h2>
          <p className="text-white">
            Spend smarter, lower your bills, get cashback on everything you buy,
            <br />
            and unlock credit to grow your business.
          </p>
        </article>

        <article className="flex w-full flex-col gap-8 overflow-hidden xl:h-96 xl:flex-row">
          <div className="flex flex-col rounded-2xl bg-white px-4 sm:px-0 md:flex-row md:gap-8 xl:w-2/3">
            <div className="mt-10 flex flex-col justify-center gap-4 text-center sm:mx-10 md:mx-0 md:ml-10 md:w-1/2 md:text-left">
              <h2 className="m-auto text-center text-3xl font-semibold text-gray-800 sm:w-[18ch] md:m-0 md:text-left">
                Pay with Payyng, quick, simple and easy
              </h2>
              <p className="m-auto text-center text-gray-500 sm:w-[34ch] md:m-0 md:text-left">
                Paying your bills on Payyng has never been easier. Whether you
                are paying for electricity or internet, Payyng gets it done
                within seconds.
              </p>
            </div>

            <div className="m-auto mt-10 max-w-72 md:mx-10 md:w-1/2 lg:mx-0">
              <img src="/assets/app_frame.png" alt="Payyng app frame" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-indigo-100 p-10 xl:w-1/3">
            <div className="w-fit rounded-full bg-indigo-200 p-4">
              <img src="/assets/check.png" alt="" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Bank level security
            </h2>
            <p className="text-gray-500">
              Your money is 100% safe and secure on Payyng. No hassles, no
              glitches, get access to your money anytime.
            </p>
          </div>
        </article>

        <article className="flex w-full flex-col gap-8 xl:h-96 xl:flex-row">
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-orange-100 p-10 xl:w-1/3">
            <div className="w-fit rounded-full bg-orange-200 p-4">
              <img src="/assets/coins.png" alt="" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Cost reduction
            </h2>
            <p className="text-gray-500">
              Payyng reduced payments maintenance and processing fees. No hidden
              fees.
            </p>
          </div>

          <div className="flex flex-col gap-8 overflow-hidden rounded-2xl bg-sky-100 px-4 sm:px-0 md:flex-row md:gap-8 xl:w-2/3">
            <div className="mt-10 flex flex-col justify-center gap-4 text-center sm:mx-10 md:mx-0 md:ml-10 md:mt-0 md:w-1/2 md:text-left">
              <h2 className="m-auto text-center text-3xl font-semibold text-gray-800 sm:w-[18ch] md:m-0 md:text-left">
                Send, receive and Exchange money
              </h2>
              <p className="m-auto text-center text-gray-500 sm:w-[34ch] md:m-0 md:text-left">
                Transfers, payments all work on Payyng. Get your alert message
                immediately after a completed transaction.
              </p>
            </div>

            <div className="m-auto max-w-96 md:mt-36 md:w-1/2">
              <img
                src="/assets/frames.png"
                alt="Frame displaying logos of various payment solutions"
              />
            </div>
          </div>
        </article>
      </section>
    </motion.div>
  );
}

export default Features;
