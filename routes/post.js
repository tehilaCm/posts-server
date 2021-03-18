const router = require("express").Router();
const controller = require("../controllers/post");

const checkAuth = require("../middlewares/checkAuth");

router.get("/getPosts/:email", checkAuth, controller.getPosts);
router.post("/post/:email", checkAuth, controller.post);
router.patch("/updatePost/:email/:id", checkAuth, controller.updatePost);
router.delete("/deletePost/:email/:id", checkAuth, controller.deletePost);

module.exports = router;
