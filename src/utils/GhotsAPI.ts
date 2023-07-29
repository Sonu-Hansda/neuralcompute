import { IPostResponse, ITagResponse } from "../types/ApiResponse";
("../types/ApiResponse");
import IPost from "../types/Post";

const BASEURL = import.meta.env.VITE_APP_GHOST_URL;
const APIKEY = import.meta.env.VITE_APP_GHOST_API_KEY;

const getAllPosts = async (
  page?: number,
  limit?: number
): Promise<IPostResponse | undefined> => {
  const response: Response = await fetch(
    `${BASEURL}/posts/?key=${APIKEY}&limit=${limit ?? 5}&page=${page ?? 1}`
  );
  if (response.ok) {
    const data: IPostResponse = await response.json();
    return data;
  } else {
    return undefined;
  }
};

const getPostByTag = async (
  tag: string,
  page?: number
): Promise<IPostResponse | undefined> => {
  const response: Response = await fetch(
    `${BASEURL}/posts/?key=${APIKEY}&limit=5&page=${
      page ?? 1
    }&filter=tag:${tag}`
  );
  if (response.ok) {
    const data: IPostResponse = await response.json();

    return data;
  } else {
    return undefined;
  }
};

const getAllTags = async (): Promise<ITagResponse | undefined> => {
  const response: Response = await fetch(`${BASEURL}/tags/?key=${APIKEY}`);
  if (response.ok) {
    const data: ITagResponse = await response.json();
    return data;
  } else {
    return undefined;
  }
};

const getPostFromSlug = async (slug: string): Promise<IPost | undefined> => {
  const response: Response = await fetch(
    `${BASEURL}/posts/slug/${slug}/?key=${APIKEY}`
  );

  if (response.ok) {
    const data: IPostResponse = await response.json();
    return data.posts[0];
  }

  return undefined;
};

export { getAllPosts, getPostFromSlug, getAllTags, getPostByTag };
