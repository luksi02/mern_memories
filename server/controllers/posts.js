import PostMessage from "../mongodb/models/postMessage.js";

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