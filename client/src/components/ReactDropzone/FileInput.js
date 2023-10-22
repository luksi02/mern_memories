import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from "../ReactDropzone/styles";

const FileInput = ({ onFileSelect }) => {
    const onDrop = (acceptedFiles) => {
        // Process the accepted files, typically an array of files
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64 = event.target.result;
                onFileSelect(base64);
            };

            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*', // Adjust the file types as needed
        multiple: false, // Set to true if you want to allow multiple files
    });

    return (
        // <div {...getRootProps()} style={{width: '97%', margin: '10px 0',}}>
        <div {...getRootProps()} >
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
        </div>
    );
};

export default FileInput;