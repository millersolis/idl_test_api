const express = require("express")
const router = express.Router()

const usersController = require('../controllers/user_controller')

router.get("/getUsers", usersController.getUsers)
router.get("/:username", usersController.getByUsername)
router.post("/createUser", usersController.create)
router.post("/idle/:username", usersController.setIdleByUsername)
router.post("/away/:username", usersController.setAwayByUsername)
router.put("/status/:username", usersController.updateStatusByUsername)
router.delete("/:username", usersController.deleteByUsername)

module.exports = router