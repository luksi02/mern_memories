import React, {useEffect} from "react";
import useStyles from "../../styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState } from "react";
// import FileBase64 from "react-file-base64/src/js/components/react-file-base64";
import FileInput from "../ReactDropzone/FileInput";
import {useDispatch} from "react-redux";
// import {createPost} from "../../reducers/postSlice";
import {createPostAsync, updatePostAsync} from "../../reducers/postSlice";
import { useSelector } from 'react-redux';
import {updatePost} from "../../api";


const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => {
        const posts = state.posts.posts; // Access the posts array
        return currentId ? posts.find((post) => post._id === currentId) : null;
    });
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const classes = useStyles();

    useEffect(() => {
        if(post) {
            setPostData(post)
        }
    }, [post]);

    const handleFileSelect = (base64) => {
        setPostData({ ...postData, selectedFile: base64 });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button clicked');

        if (currentId) {
            console.log('Updating post');
            // dispatch(updatePostAsync(currentId, postData));
            dispatch(updatePostAsync({ id: currentId, ...postData }));
            clear();
        } else {
            console.log('Creating post');
            dispatch(createPostAsync(postData));
            clear();
        }
    }

    const clear = () => {
        // setCurrentId(''); // Initialize with an empty string
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Creating' } a Memory
                </Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    name="Title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="Message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    {/*NO LONGER WORKS WITH REACT!*/}
                    {/*<FileBase64*/}
                    {/*    type="file"*/}
                    {/*    multiple={false}*/}
                    {/*    onDone={({base64}) => setPostData({...postData, selectedFile: base64 })}*/}
                    {/*/>*/}

                    <FileInput onFileSelect={handleFileSelect} />

                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;