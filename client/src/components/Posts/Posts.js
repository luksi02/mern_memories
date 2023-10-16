import React from "react";
import Post from './Post/Post'
import useStyles from "../../styles";

const Posts = () => {

  const dispatch = useDispatch();

  const handleCreatePost = (postData) => {
    dispatch(createPost(postData));
  }

  const handleUpdatePost = (postId, updatedPostData) => {
    dispatch(updatePost({ id: postId, updatedPost: updatedPostData }));
  }

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  }

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
  }

    const classes = useStyles();
    return (
        <>
            <h1>Posts</h1>
            <Post />
        </>
    )
}

export default Posts;
