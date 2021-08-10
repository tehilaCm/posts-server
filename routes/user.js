const router = require("express").Router();
const controller = require("../controllers/user");

const checkAuth = require("../middlewares/checkAuth");

router.post("/signIn", controller.signIn);
router.post("/signUp", controller.signUp);
router.post("/savePost", checkAuth, controller.savePost);
router.post("/unsavePost", checkAuth, controller.unsavePost);
router.get("/getSearches/:email", checkAuth, controller.getSearches);

module.exports = router;
