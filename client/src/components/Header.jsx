import { MenuIcon, UserIcon } from "@heroicons/react/solid";
// import SurahList from "../pages/SurahList";

export default function Header() {
  return (
    <div className="">
      <div className="flex flex-row justify-between py-3 px-8 items-center bg-gray-700">
        <ul className="flex gap-2">
          {/* ------- menu button --------  */}
          <li className="pt-1 pl-5">
            <a href="_blank">
              <MenuIcon className="size-6 text-white" />
            </a>
          </li>
          <li className="font-bold text-xl text-white">
            <a href="/" className="tracking-wide">
              QURAAN
            </a>
          </li>
        </ul>
        <ul className="flex gap-3 justify-center items-center">
          <li>
            <a href="_blank">
              <UserIcon className="size-6 text-white" />
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="h-2"></div> */}
      {/* <div className="flex justify-center py-10 bg-gray-400">
        <SearchInput placeholder="Search what you want to read?" />
      </div> */}
    </div>
  );
}
