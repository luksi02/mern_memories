import PostMessage from "../mongodb/models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts =  async (req, res) => {
    try {
        // res.send('THIS WORKS!')
        const postMessages = await PostMessage.find();

        console.log("worked")
        // console.log(postMessages);

        res.status(200).json(postMessages)


    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error)
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    // res.send('Post Creation');

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json( {message: error.message });
    }
}

// export const updatePost = async (req, res) => {
//     const { id: _id } = req.params;
//
//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');
//
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
//
//     res.json(updatedPost);
// }

// export const updatePost = async (req, res) => {
//     const { id: _id } = req.params;
//     const post = req.body; // Get post data from the request body
//
//     if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');
//
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
//
//     res.json(updatedPost);
// }


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body; // Get post data from the request body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    // const post = req.body; // Get post data from the request body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');

    await PostMessage.findByIdAndRemove(_id);

    console.log('DELETE')

    res.json({ message: 'Post deleted sucessfully!'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, {new: true});

    res.json(updatedPost);
}