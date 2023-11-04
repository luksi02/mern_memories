import React, {useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import memories from './images/memories.png'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import useStyles from './styles'
import {useDispatch, useSelector} from "react-redux";
import { fetchAllPostsAsync, createPost, deletePost, likePost, updatePost } from "./reducers/postSlice"

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts)

    console.log(posts)

    useEffect(() => {
        dispatch(fetchAllPostsAsync());
    }, [dispatch]);


    return (
       <Container maxWidth="lg">
           <AppBar className={classes.appBar} position="static" color="inherit">
               <Typography variant="h2" align="center">
                   Memories
               </Typography>
               <img className={classes.image} src={memories} alt="memories" height="60" />
           </AppBar>
           <Grow in>
               <Container>
                   <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
                       <Grid item xs={12} sm={7}>
                           <Posts  setCurrentId={setCurrentId}/>

                           {/*{posts.map((post) => (*/}
                           {/*    <div key={post.id}>*/}
                           {/*        <h3>{post}</h3>*/}
                           {/*    </div>*/}
                           {/*))}*/}

                       </Grid>

                       <Grid item xs={12} sm={5}>
                           <Form currentId={currentId} />
                       </Grid>
                   </Grid>
               </Container>
           </Grow>
       </Container>
    )
}

export default App;