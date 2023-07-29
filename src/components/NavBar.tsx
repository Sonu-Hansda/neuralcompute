import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const title = path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    if (!title) {
      document.title = "NeuralCompute";
    } else {
      document.title = title + " - NeuralCompute";
    }
    return () => {
      document.title = "NeuralCompute";
    };
  });

  const menuItems = (
    <ul className="p-12 lg:p-0 flex flex-col lg:flex-row gap-x-4 gap-y-4">
      <NavItem closeMenu={closeMenu} href="/" label="Home" />
      <NavItem closeMenu={closeMenu} href="/blogs" label="Blogs" />
      <NavItem closeMenu={closeMenu} href="/projects" label="Projects" />
      <NavItem closeMenu={closeMenu} href="/contact" label="Contact" />
    </ul>
  );
  return (
    <header className="container mx-auto p-4 border-b border-gray-100">
      <nav className="flex justify-between items-center">
        <Link to={"/"}>
          <span className="flex items-center gap-x-2">
            <div className="border-violet-950 border-2 rounded-full shadow-lg font-bold p-1 lg:p-2">
              NC
            </div>
            <h1 className="text-xl font-bold">Neural Compute</h1>
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          className={`z-50 block lg:hidden border ${
            showMenu
              ? "fixed right-4 md:right-9 top-4 border-white text-white"
              : "border-black text-black"
          } px-2 py-1 rounded-sm transition-colors duration-700`}
        >
          {showMenu ? <XMarkIcon height={24} /> : <Bars3Icon height={24} />}
        </button>
        <div
          className={`fixed inset-0 h-full w-full bg-violet-950 text-white z-20 drop-shadow-2xl ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-300`}
        >
          <span className="flex items-center gap-x-2 pt-4 pl-10 ">
            <div className="border-white border-2 rounded-full font-bold p-1 lg:p-2">
              NC
            </div>
            <h1 className="text-xl font-bold">Neural Compute</h1>
          </span>
          {menuItems}
        </div>
        <div className="hidden lg:block">{menuItems}</div>
      </nav>
    </header>
  );
};

export default NavBar;
