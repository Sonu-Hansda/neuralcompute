export default interface ITag{
    id:string;
    name:string;
    slug:string;
    description?:string | undefined;
    feature_image?:string|undefined;
    visibility:string;
    
}