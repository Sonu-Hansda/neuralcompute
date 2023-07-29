import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="p-8 lg:p-12 flex flex-col items-center justify-center border my-2 md:my-6">
      <p className="text-xl md:text-4xl mb-4 text-center">
        <span className="text-gray-500">"</span> Unlocking the power of
        creativity through technology and design.{" "}
        <span className="text-gray-500">"</span>
      </p>
      <span>
        <Link to={"/blogs"}>

        <button className="border-2 rounded-s-full text-sm md:text-lg font-bold p-3 md:p-4 hover:bg-gray-800 hover:text-white transition-colors ease-in-out duration-500">
          Read blogs
        </button>
        </Link>
        <Link to={"/projects"}>
        <button className="border-2 text-sm md:text-lg font-bold p-3 md:p-4 hover:bg-gray-800 hover:text-white transition-colors ease-in-out duration-500">
          Projects
        </button>
        </Link>
        <Link to={"/contact"}>
        <button className="border-2 rounded-e-full text-sm md:text-lg font-bold p-3 md:p-4 hover:bg-gray-800 hover:text-white transition-colors ease-in-out duration-500">
          Hire me :)
        </button>
        </Link>
      </span>
    </div>
  );
};

export default HeroSection;
