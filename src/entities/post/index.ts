export type { Post, PostsResponse } from './model/types';
export { getPostsByUserId } from './api/getPostsByUserId';
export { getPostById } from './api/getPostById';
export { setUserPosts, setLoading, setError, setCurrentPost, default as postReducer } from './model/slice';


