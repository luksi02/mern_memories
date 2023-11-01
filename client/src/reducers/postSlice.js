import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api/index";
import {fetchPosts, url} from '../api'
import axios from 'axios';

const initialState = {
    posts: [
        1,
        2,
        3,
    ]
}

// fetchAllPosts: (state, {payload}) => {
//     return state;
// },
// export const createPostAsync = createAsyncThunk('posts/createPostAsync', async (postData, thunkAPI) => {
//     const response = await apiCall(postData);
//     return response.data;
// })
//
export const fetchAllPostsAsync = createAsyncThunk('posts/fetchAllPostsAsync', async () => {
    // // const response = await apiCallToFetchPosts();
    // const response = await fetchPosts();
    // return response.data;

    const data = await api.fetchPosts();
    return data;
})



const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push(action.payload);

            // Send a POST request to your server to save post
            axios.post('/api/posts', action.payload)
                .then((response) => {
                    console.log('Post saved', response.data)
                })
                .catch((error) => {
                    console.log("Error: ", error)
                })
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
    },
    extraReducers: {
        [fetchAllPostsAsync.pending]: () => {
            console.log("Pending");
        },

        [fetchAllPostsAsync.fulfilled]: (state, {payload}) => {
            console.log("Posts fetched successfully!");
            return {...state, posts: payload}
        },

        [fetchAllPostsAsync.rejected]: () => {
            console.log("Rejected!");
        }

    }
});

export const { createPost, updatePost, deletePost, likePost } = postSlice.actions
export default postSlice.reducer;