import ITag from "./Tag";

export default interface IPost{
    id:string;
    title:string;
    slug:string;
    html:string;
    feature_image:string;
    excerpt:string;
    reading_time:number;
    tags?:ITag[];
    feature_image_caption:string;
    created_at:string;
    updated_at:string;
    published_at:string;
  }
  