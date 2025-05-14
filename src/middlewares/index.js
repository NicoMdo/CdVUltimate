const generic = require("./generic.middleware");
const userMiddleware = require("./user.middleware");
const postMiddleware = require("./post.middleware");
const postImageMiddleware = require("./postImage.middleware");
const tagMiddleware = require("./tag.middleware");

module.exports = {generic, userMiddleware, postMiddleware, postImageMiddleware, tagMiddleware}