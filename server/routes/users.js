const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {

    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (e) {
                res.status(500).json({message: e.message})
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json({message: "USER UPDATED"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    } else {
        res.status(403).json({message: "YOU CAN ONLY UPDATE YOUR ACCOUNT"})
    }
})

// delete user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (e) {
                res.status(500).json({message: e.message})
            }

        }
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "USER DELETED"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }

    } else {
        res.status(403).json({message: "YOU CAN ONLY DELETE YOUR ACCOUNT"})
    }
})

// get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ data:user, message: "SUCCESS"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

// follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({$push: {followings: req.params.id}})
                res.status(200).json({message: "SUCCESS"})
            } else {
                res.status(403).json({message: "You already following this user"})
            }
        } catch (e) {
                res.status(500).json({message: e.message})
        }
    } else {
        res.status(403).json({message: "YOU CAN'T FOLLOW YOURSELF"})
    }
})

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentUser.updateOne({$pull: {followings: req.body.userId}})
                res.status(200).json({message: "You unfollowed this user !"})
            } else {
                res.status(403).json({message: "You already dont follow this user"})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    } else {
        res.status(403).json({message: "YOU CAN'T UNFOLLOW YOURSELF"})
    }
})

router.get("/", (req, res) => {
    res.send("this user routes");
})

module.exports = router;