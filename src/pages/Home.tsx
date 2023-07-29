import { useEffect, useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import HeroSection from "../components/HeroSection";
import PostCard from "../components/PostCard";
import IPost from "../types/Post";
import PostCardShimmer from "../components/PostCardShimmer";
import { Link } from "react-router-dom";
import { getAllPosts } from "../utils/GhotsAPI";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const fetchPosts = async () => {
    setLoading(true);
    const allPosts = (await getAllPosts(undefined,4))?.posts;
    setPosts(allPosts ?? []);
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <HeroSection />
      <div className="flex w-full items-center justify-center">
        <span className="h-0.5 w-1/4 md:w-1/3 bg-gray-200"></span>
        <h1 className="p-2 text-lg md:text-xl font-light underline">
        <DocumentTextIcon
          className="inline -translate-y-1 mr-2"
          height={24}
          width={24}
        />
        Latest Posts
      </h1>
        <span className="h-0.5 w-1/4 md:w-1/3 bg-gray-200"></span>
      </div>
     
      {!loading ? (
        posts.length > 0 ? (
          <div className="mx-2 lg:mx-0 grid lg:grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}

            <Link to="/blogs">
              <button className="border p-4">See all {">>"}</button>
            </Link>
          </div>
        ) : (
         <ErrorMessage message="Error while connecting to the server." />
        )
        ) : (
          <div className="grid lg:grid-cols-2 mx-4 lg:mx-0 gap-4">
            {[1, 2, 3, 4].map((val) => (
              <PostCardShimmer key={val} />
              ))}
              </div>
       
      )}
    </>
  );
};

export default Home;
