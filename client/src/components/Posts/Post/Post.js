import React from "react";
import useStyles from "../../../styles";
import {Card, CardActions, CardMedia, Button, Typography, CardContent} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {Image} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {deletePostAsync, likePostAsync} from "../../../reducers/postSlice";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // Calculate the new likeCount (incremented by 1)
    const newLikeCount = post.likeCount + 1;


    return (
        <Card className={classes.card} >
            <img alt="image" className={classes.media} src={post.selectedFile} title={post.title} />
            {/*<Image className={classes.media} src={post.selectedFile} title={post.title} />*/}
            {/*<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />*/}
            {/*<CardMedia className={classes.media} src={post.selectedFile} title={post.title}  />*/}

            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button
                    style={{color: 'red'}}
                    size='large'
                    onClick={() => setCurrentId(post._id)}
                >
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" color='textSecondary' component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePostAsync({ postId: post._id, likeCount: newLikeCount }))}>

                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>

                <Button size="small" color="primary" onClick={() => dispatch(deletePostAsync(post._id))} >
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>

            </CardActions>
        </Card>
    )
}

export default Post;