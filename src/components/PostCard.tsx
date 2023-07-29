import { Link } from "react-router-dom";

interface IPost{
  id:string;
  title:string;
  slug:string;
  html:string;
  feature_image:string;
  excerpt:string;
  reading_time:number;
  feature_image_caption:string;
}


const PostCard = (props: IPost) => {
  return (
    <Link to={`/post/${props.slug}`} state={{post:props}}  >
    <div className="bg-white flex justify-between items-center gap-x-2 p-0 lg:p-4 cursor-pointer hover:shadow-lg border hover:-translate-y-1 transition-all ease-in-out duration-500">
        <span className="p-2 lg:p-0">
        <h1 className="text-md lg:text-xl font-bold mb-1">{props.title}</h1>
        <p className="hidden md:block text-sm lg:text-md font-thin">{props.excerpt}</p>
        <span className="text-sm text-gray-600">{props.reading_time} min read</span>
        </span>
        { props.feature_image && (
          <img className="h-32 w-32 object-cover" src={props.feature_image} />
        )}
      </div>
    </Link>
  );
}

export default PostCard;