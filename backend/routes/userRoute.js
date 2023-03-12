const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, updateUserDetails, getAllUser, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth")



const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser ,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser , updatePassword);

router.route("/dashboard/profile/update").put(isAuthenticatedUser , updateProfile)

router.route("/user/:id").put(updateUserDetails);

router.route("/admin/users").get(getAllUser);

router.route("/admin/user/:id").delete(isAuthenticatedUser, deleteUser);

module.exports = router;    