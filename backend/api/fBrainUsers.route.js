import express from "express";
import FBrainUsersControl from "./fBrainUsers.controller.js";
const router = express.Router();

router.route("/").get((req, res) => res.send("Welcome to FullBrain dashboard"))

export default router;