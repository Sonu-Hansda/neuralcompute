import IPost from "./Post";
import ITag from "./Tag";

interface IPostResponse{
    posts:IPost[],
    meta:{
        pagination:{
            page:number;
            limit:number;
            pages:number;
            total:number;
            next?:number;
            prev?:number;
        }
    }
}

interface ITagResponse{
    tags:ITag[],
    meta:{
        pagination:{
            page:number;
            limit:number;
            pages:number;
            total:number;
            next?:number;
            prev?:number;
        }
    }
}

export type {IPostResponse,ITagResponse}