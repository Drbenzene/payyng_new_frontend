import Airtel from "../assets/logo-wall/airtel.png";
import Payoneer from "../assets/logo-wall/payoneer.png";
import Visa from "../assets/logo-wall/visa.png";
import Mobile from "../assets/logo-wall/mobile.png";
import Ikeja from "../assets/logo-wall/ikeja.png";
import Dstv from "../assets/logo-wall/dstv.png";
import LogoWall from "../common/LogoWall";

function Partners() {
  return (
    <section id="partners" className="mt-20 flex flex-col bg-gray-50 py-20">
      <article className="mb-10 w-full px-8 text-center lg:px-12">
        <h2 className="mb-4 text-4xl font-semibold text-gray-800">
          Transact seamlessly with...
        </h2>
        <p>
          Connect your other accounts to Payyng seamlessly. Payyng supports 200+
          <br />
          integrations with other payment platforms like stripe, paypal,
          payoneer and others
        </p>
      </article>
      <div className="xl:flex xl:justify-center">
        <LogoWall
          src1="/assets/logo-wall/klarna.png"
          src2="assets/logo-wall/stripe.png"
          src3="assets/logo-wall/paypal.png"
          alt1="Klarna logo"
          alt2="Stripe logo"
          alt3="PayPal logo"
        />
        <LogoWall
          src1="/assets/logo-wall/bedc.png"
          src2="/assets/logo-wall/mastercard.png"
          src3="assets/logo-wall/mtn.png"
          alt1="Bedc logo"
          alt2="Mastercard logo"
          alt3="Mtn logo"
        />
      </div>
      <div className="xl:flex xl:justify-center">
        <LogoWall
          src1="/assets/logo-wall/airtel.png"
          src2="/assets/logo-wall/payoneer.png"
          src3="assets/logo-wall/visa.png"
          alt1="Airtel logo"
          alt2="Payoneer logo"
          alt3="Visa logo"
        />
        <LogoWall
          src1="/assets/logo-wall/mobile.png"
          src2="/assets/logo-wall/ikeja.png"
          src3="assets/logo-wall/dstv.png"
          alt1="Mobile logo"
          alt2="Ikeja logo"
          alt3="Dstv logo"
        />
      </div>
    </section>
  );
}

export default Partners;
