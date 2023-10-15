import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = []

// fetchAllPosts: (state, {payload}) => {
//     return state;
// },
export const createPostAsync = createAsyncThunk('posts/createPostAsync', async (postData, thunkAPI) => {
    const response = await apiCall(postData);
    return response.data;
})

export const fetchAllPostsAsync = createAsyncThunk('posts/fetchAllPostsAsync', async (_, thunkAPI) => {
    const response = await apiCallToFetchPosts();
    return response.data;
})



const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action) => {
            const { id, updatedPost} = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === id);
            if (postIndex !== -1) {
                state.posts[postIndex] = { ...state.posts[postIndex], ...updatedPost };
            }
        },
        deletePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
        },
        likePost: (state, action) => {
            const postId = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes += 1;
            }
        }


    }
});

export default postSlice.reducer;