const router = require("express").Router()
const chatModule = require("./chat.module")
var http = require("http")
const req = require("express/lib/request")
const res = require("express/lib/response")

const getAnswerController = async (req, res) => {
    const result = await chatModule.getAnswerModule(req)
    return res.send(result)
}

const getChatGptModelController = async(req,res) => {
    const result = await chatModule.getChatGptModelModule(req)
    return res.send(result)
}

const getAnswerChatController = async(req,res) => {
    const result = await chatModule.getAnswerChatModule(req)
    return res.send(result)
}

module.exports = {
    getAnswerController:getAnswerController,
    getChatGptModelController:getChatGptModelController,
    getAnswerChatController:getAnswerChatController
}
