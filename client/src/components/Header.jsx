import { MenuIcon, UserIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import Profile from "../pages/profile";

import { useState } from "react";
import Menu from "../components/Menu";
// import SurahList from "../pages/SurahList";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between py-3 px-8 items-center bg-gray-700">
        <ul className="flex gap-2">
          {/* ------- menu button --------  */}

          <li className="size-6 text-white" onClick={handleMenu}>
            {/* <MenuIcon/> */}
            {isOpen ? (
              <FontAwesomeIcon icon={faRectangleXmark} />
            ) : (
              <MenuIcon className="size-6 text-white" />
            )}
          </li>

          <li className="font-bold text-xl text-white">
            <a href="/" className="tracking-wide">
              QURAAN
            </a>
          </li>
        </ul>
        <ul className="flex gap-3 justify-center items-center">
          <li>
            <a href="/profile">
              <UserIcon className="size-6 text-white">
                <Profile />
              </UserIcon>
            </a>
          </li>
        </ul>
      </div>
      {isOpen && <Menu />}
    </div>
  );
}
