const router = require('express').Router();
const userController = require("../controller/adminControllerUsers")

router.get("/" , userController.getUsers)
router.delete("/" , userController.deleteOneUser)
router.put("/" , userController.updateOneUser)

module.exports = router