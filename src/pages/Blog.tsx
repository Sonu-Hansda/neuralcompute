import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import IPost from "../types/Post";
import PostCardShimmer from "../components/PostCardShimmer";
import { getAllPosts, getAllTags, getPostByTag } from "../utils/GhotsAPI";
import ErrorMessage from "../components/ErrorMessage";
import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import ITag from "../types/Tag";
import { IPostResponse } from "../types/ApiResponse";

const Blog = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("All");
  const [nextPage, setNextPage] = useState<number | undefined>();
  const getTags = async () => {
    const data = await getAllTags();
    setTags(data?.tags ?? []);
  };
  const getPosts = async (page?: number) => {
    setLoading(true);
    let allPosts: IPostResponse | undefined;
    if (currentTag !== "All") {
      allPosts = await getPostByTag(currentTag, page);
    } else {
      allPosts = await getAllPosts(page);
    }

    if (allPosts) {
      setPosts(
        allPosts.meta.pagination.page == 1
          ? allPosts.posts
          : (prev) => [...prev, ...allPosts!.posts]
      );
      setNextPage(allPosts.meta.pagination.next);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    let allPosts: IPostResponse | undefined;
    if (nextPage) {
      if (currentTag !== "All") {
        allPosts = await getPostByTag(currentTag, nextPage);
      } else {
        allPosts = await getAllPosts(nextPage);
      }

      if (allPosts) {
        setPosts(
          allPosts.meta.pagination.page == 1
            ? allPosts.posts
            : (prev) => [...prev, ...allPosts!.posts]
        );
        setNextPage(allPosts.meta.pagination.next);
      }
    }
  };
  const handleTagClick = async (tag: string) => await setCurrentTag(tag);
  useEffect(() => {
    setPosts([]);
    getPosts();
  }, [currentTag]);

  useEffect(() => {
    getPosts();
    getTags();
  }, []);

  return (
    <>
      <div className="flex gap-x-8 flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 p-4">
          <h1 className="mt-2 mb-4 text-xl">
            Filters{" "}
            <AdjustmentsHorizontalIcon className="inline ml-2" height={24} />{" "}
          </h1>
          <div className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleTagClick("All")}
              className={`${
                currentTag == "All" ? "bg-black text-white" : "bg-gray-200"
              } px-3 py-2 text-sm text-center rounded-full hover:text-white hover:bg-black transition-colors duration-200 ease-linear`}
            >
              All
            </button>
            {tags.length > 0 &&
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`${
                    currentTag == tag.name
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  } px-3 py-2 text-sm text-center rounded-full hover:text-white hover:bg-black transition-colors duration-200 ease-linear`}
                >
                  {tag.name}
                </button>
              ))}
          </div>
        </div>
        {!loading ? (
          <div className="w-full lg:w-1/2 my-4 grid grid-cols-1 gap-y-2 lg:gap-y-4 mx-2 lg:mx-0">
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
                <span className="text-center">
                  {nextPage && (
                    <button
                      onClick={handleLoadMore}
                      className="bg-gray-300 hover:bg-gray-200 transition-colors duration-300 text-sm p-3"
                    >
                      Load more{" "}
                      <ArrowPathIcon
                        className="ml-2 inline-block"
                        height={20}
                      />{" "}
                    </button>
                  )}
                </span>
              </>
            ) : (
              <ErrorMessage message="Error while connecting to the server." />
            )}
          </div>
        ) : (
          <div className="w-full lg:w-1/2 my-4 grid grid-cols-1 gap-y-2 lg:gap-y-4 mx-2 lg:mx-0">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <PostCardShimmer key={num} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
