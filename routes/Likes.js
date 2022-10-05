const express = require("express");
const User = require("../models/User");
const Post = require("../models/Stories");
const Likes = require("../models/Likes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();


module.exports = router 
