import { useParams } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import IPost from "../types/Post";
import { getPostFromSlug } from "../utils/GhotsAPI";
import DisqusComment from "../components/DisqusComment";

const SinglePost = () => {
    const [post,setPost] = useState<IPost>();
    const [loading,setLoading] = useState<Boolean>(true);
    const {slug} = useParams();
    const getPost = async()=>{
      setLoading(true);
      const fetchPost = await getPostFromSlug(slug!);
      setPost(fetchPost);
      setLoading(false);
    };
    useEffect(()=>{
      getPost();
      hljs.highlightAll();
      document.title = post?.title ?? "Neural Compute";
    },[]);
    if (!loading){
      return (
        <div className="lg:px-48 mb-4">
      {post!.feature_image && (
        <img className="object-fill mb-2 md:mb-4 lg:mb-16" src={post!.feature_image} />
        )}
        <h1 className="px-4 lg:px-48 md:px-16 text-3xl lg:text-5xl font-extrabold mb-2 lg:mb-8">{post!.title}</h1>
       <div className="content" dangerouslySetInnerHTML={{__html: post!.html}}></div>
       <DisqusComment {...post!} />
    </div>
  )
} return (
  <div className="flex items-start flex-col lg:px-48 mb-4 animate-pulse mt-8">
    <div className="bg-gray-300 h-80 w-3/4 mb-16 mx-auto">
    </div>
    <div className="bg-gray-300 h-12 w-full mb-8">
    </div>
    <p className="bg-gray-300 h-6 w-full mb-4"></p>
    <p className="bg-gray-300 h-4 w-4/5 mb-4"></p>
    <p className="bg-gray-300 h-3 w-1/2 mb-4"></p>
  </div>
)
}

export default SinglePost