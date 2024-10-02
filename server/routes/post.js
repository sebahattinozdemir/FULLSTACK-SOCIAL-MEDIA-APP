const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    newPost.save()
        .then(() => {
            res.send('Document saved successfully!');
        })
        .catch((error) => {
            res.send('Error saving document:', error);
        });
})
//update a post
router.put("/:id", async (req, res) => {

    const post = await Post.findById(req.params.id);

    if(post.userId === req.body.userId ) {
        await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }).then((post) => {
            res.status(200).json({message: "POST IS UPDATED"})
        }).catch((error) => {
            res.status(500).json({message: error.message})
        });
    } else {
        res.status(403).json({message: "unauthorized"})
    }
})

//delete a post
router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId ) {
        await Post.findByIdAndDelete(req.params.id).then((post) => {
            res.status(200).json({message: "POST is DELETED !"})
        }).catch((error) => {
            res.status(500).json({message: error.message})
        })
    } else {
        res.status(403).json({message: "unauthorized"})
    }
})

//like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }).then((post) => {
                res.status(200).json({message: "POST IS liked"})
            }).catch((error) => {
                res.status(500).json({message: error.message})
            });
        } else {
            res.status(403).json({message: "You already liked this post!"})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({message: "SUCCESS !", data: post})
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})
//get timeline post
router.get("/timeline/all", async (req, res) => {
    try {
        let posts = [];
        const currentUser = await  User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})
module.exports = router;