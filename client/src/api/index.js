import axios from 'axios';

export const url = 'http://localhost:5000/posts';

export const fetchPosts = async () => {
    const response = await axios.get(url);
    return response.data;
}
export const createPost = (newPost) => axios.post(url, newPost)