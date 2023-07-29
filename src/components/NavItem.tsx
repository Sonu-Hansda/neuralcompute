import { Link } from "react-router-dom";
interface Props {
  href: string;
  label: string;
  closeMenu: () => void;
}

const NavItem = (props: Props) => {
  return (
    <li className="cursor-pointer lg:pr-3 lg:border-r">
      <Link
        to={props.href}
        onClick={() => props.closeMenu()}
        className="group hover:text-gray-600"
      >
        {props.label}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-black"></span>
      </Link>
    </li>
  );
};

export default NavItem;
