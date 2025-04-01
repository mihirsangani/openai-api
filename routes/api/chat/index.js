const express = require("express")
const router = express.Router()
const chatController = require("./chat.controller")
const middleware = require("../../middleware")

router.post("/chat-gpt-completions", chatController.getAnswerController)//Done
router.post("/chat-gpt-chat",chatController.getAnswerChatController)
router.get("/chat-gpt-model",chatController.getChatGptModelController)

module.exports = router
