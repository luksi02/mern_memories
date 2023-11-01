import React from "react";
import useStyles from "../../styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState } from "react";
// import FileBase64 from "react-file-base64/src/js/components/react-file-base64";
import FileInput from "../ReactDropzone/FileInput";
import {useDispatch} from "react-redux";
import {createPost} from "../../reducers/postSlice";

const Form = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const classes = useStyles();

    const handleFileSelect = (base64) => {
        setPostData({ ...postData, selectedFile: base64 });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData))
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Creating a Memory
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
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
                    variant="container"
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
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;