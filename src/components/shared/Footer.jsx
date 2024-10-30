import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import LogoIU from "../../assets/IU.png";
import AppStore from "../../assets/app-store.png";
import PlayStore from "../../assets/play-store.png";

function Footer() {
  return (
    <div className="footer bg-gray-200 text-gray-600 py-8">
      <div className="container mx-auto px-6 lg:px-60">
        <div className="content grid gap-8 lg:grid-cols-6 lg:gap-4">
          <div className="content-column-main lg:col-span-2">
            <a href="/" className="block mb-4">
              <img
                src={LogoIU}
                loading="lazy"
                className="w-14 h-14 rounded-full"
                alt="logo"
              />
            </a>
            <ul className="mb-4 space-y-2">
              <li>Đại Học Quốc Tế - Đại Học Quốc Gia TP.HCM</li>
              <li>Liên hệ: 0327876792 - phido76792@gmail.com</li>
            </ul>
            <p className="font-bold text-black mb-2">Chứng nhận bởi:</p>
            <a href="https://hcmiu.edu.vn/">
              <img
                src={LogoIU}
                loading="lazy"
                className="w-14 h-14 rounded-full"
                alt="logo"
              />
            </a>
          </div>
          <div className="content-column">
            <p className="title font-bold text-black mb-2">About Website</p>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-red-500 transition-all" href="/">
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="/contact"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="/product"
                >
                  Job Opportunities
                </a>
              </li>
            </ul>
          </div>
          <div className="content-column">
            <p className="title font-bold text-black mb-2">Candidates</p>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-red-500 transition-all" href="/signup">
                  Register Account
                </a>
              </li>
              <li>
                <a className="hover:text-red-500 transition-all" href="/">
                  Search Job
                </a>
              </li>
              <li>
                <a className="hover:text-red-500 transition-all" href="/">
                  Create CV
                </a>
              </li>
            </ul>
          </div>
          <div className="content-column">
            <p className="title font-bold text-black mb-2">Recruiters</p>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-red-500 transition-all" href="/signup">
                  Register Account
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="/account"
                >
                  Login Website
                </a>
              </li>
              <li>
                <a className="hover:text-red-500 transition-all" href="/">
                  Post Job
                </a>
              </li>
            </ul>
          </div>
          <div className="content-column">
            <p className="title font-bold text-black mb-2">Follow Us</p>
            <ul className="flex items-center space-x-4 text-2xl">
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="https://www.facebook.com/"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="https://www.linkedin.com/"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="https://www.youtube.com/"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
            <p className="title font-bold text-black mt-4 mb-2">Download App</p>
            <ul className="flex items-center space-x-4">
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="https://www.facebook.com/"
                >
                  <img width="94" height="28" src={AppStore} alt="appstore" />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-500 transition-all"
                  href="https://www.linkedin.com/"
                >
                  <img width="94" height="28" src={PlayStore} alt="playstore" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyRight text-center text-gray-800 mt-0 text-sm">
          <p>Copyright © Do Tan Hoang Phi - ITITIU20273. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
