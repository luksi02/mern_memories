import React from "react";
import Post from './Post/Post'
import useStyles from "../../styles";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from 'react-redux';

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    console.log(posts)
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItlems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} xs={12} sm={6} item>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>

            // <>
            //     <h1>Posts</h1>
            //     <Post />
            // </>
        )
    )
}

export default Posts;