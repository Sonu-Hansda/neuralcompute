import { DiscussionEmbed } from "disqus-react";
import IPost from "../types/Post";

function DisqusComment(post:IPost) {
    const disqusShortname = "neuralcompute";
    const disqusConfig = {
        url:`https://neuralcompute.xyz/${post.slug}`,
        identifier:post.id,
        title:post.title,

    };
    return (
    <div className="w-3/4 mx-auto">
        <DiscussionEmbed config={disqusConfig} shortname={disqusShortname} />
    </div>
  )
}

export default DisqusComment;