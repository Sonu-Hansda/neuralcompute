const PostCardShimmer = () => {
  return (
    <div className="w-full border rounded-md mx-auto p-8">
      <div className="flex animate-pulse justify-between">
        <div className="w-1/2 flex flex-col space-y-3">
          <div className=" bg-gray-300 h-8 rounded-md "></div>
          <div className=" bg-gray-300 w-32 h-4 rounded-md "></div>
          <div className=" bg-gray-300 w-16 h-4 rounded-md "></div>
        </div>
        <div className="bg-gray-300 w-32 h-32 rounded "></div>
      </div>
    </div>
  );
};

export default PostCardShimmer;
