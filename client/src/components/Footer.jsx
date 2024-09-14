import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="bg-gray-700 flex flex-col px-5 p-3 py-20 sm:px-32">
      <div
        className="grid sm:grid-cols-12 gap-2 text-gray-300 py-5 border-b
       border-gray-500"
      >
        <div className="col-span-2">{/*  */}</div>

        <div className="col-span-2 leading-10 pb-10">
          <h4 className="text-white font-bold pb-3">Quick Links</h4>
          <ul className="">
            <li>Work</li>
            <li>Services</li>
            <li>Products</li>
            {/* <li>Tips & Tricks</li> */}
          </ul>
        </div>

        <div className="col-span-2 leading-10 pb-10">
          <h4 className="text-white font-bold pb-3">Programs</h4>
          <ul>
            <li>Hadith</li>
            <li>Seerah</li>
            <li>Translation</li>
          </ul>
        </div>

        <div className="col-span-2 leading-10 pb-10">
          <h4 className="text-white font-bold pb-3">Resources</h4>
          <ul>
            <li>FAQs</li>
            <li>Submit Tickets</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* ---------newsletter ---------- */}
        <div className="col-span-3 flex flex-col pb-5">
          <div>
            <h4 className="pb-3 text-white font-bold leading-10">Newsletter</h4>
            <p className="py-4">Subscribe newsletter to get updates.</p>
          </div>

          <div className="flex flex-row items-center">
            <div className="">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 w-full"
              />
            </div>
            <div
              className="flex flex-row justify-center items-center w-14 h-12
             bg-emerald-700"
            >
              {/* <button>
                <img src={sendButton} alt="send button" />
              </button> */}
            </div>
          </div>

          <div className="text-white">
            <ul className="flex flex-row space-x-5 py-5">
              <li className="text-xl">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="text-xl">
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="text-xl">
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li className="text-xl">
                <a href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* -------copyright section-------- */}

      <div
        className=" flex  sm:flex-col
         pt-8 text-center"
      >
        <p className="text-gray-300">copyright ©2024 | All rights reserved | Piten</p>
      </div>
    </div>
  );
}
