const router = require('express').Router();
const userController = require("../controller/adminControllerUsers")

router.get("/" , userController.getUsers)
router.delete("/:idusers" , userController.deleteOneUser)
router.put("/:idusers" , userController.updateOneUser)

module.exports = router