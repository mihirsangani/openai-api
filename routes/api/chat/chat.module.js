const router = require("express").Router()
const chatDb = require("./chat.db")
const crud = require("../../crud")
const path = require("path")
const req = require("express/lib/request")
const axios = require("axios")
const { json } = require("express/lib/response")

async function generateResponse(body,apiEndpoint) {
    console.log(body)
    try {
        const response = await axios.post(apiEndpoint, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        })

        var result = {
            status: true,
            data: response.data,
        }
        return result
    } catch (error) {
        console.log(error.message)
        return {
            status: false,
            error: error.message,
        }
    }
}

const getAnswerModule = async (req) => {
    var prompt = req.body.prompt
    var token = req.query.token

    if (prompt == undefined || prompt == null || prompt == "" || token == null || token == undefined || token == "") {
        return {
            status: false,
            error: {
                code: 2,
                message: "Invalid Param Passed",
            },
        }
    }

    if (token != process.env.AUTHTOKEN) {
        return {
            status: false,
            error: {
                code: 2,
                message: "Invalid Token Passed",
            },
        }
    }

    var req_payload = req.body
    req_payload.model = req_payload.model ? req_payload.model : "text-davinci-003"
    var apiEndpoint = "https://api.openai.com/v1/completions"
    var res = await generateResponse(req_payload,apiEndpoint)
    return res
}

const getAnswerChatModule = async (req) => {
    var prompt = req.body.prompt
    var token = req.query.token

    if (prompt == undefined || prompt == null || prompt == "" || token == null || token == undefined || token == "") {
        return {
            status: false,
            error: {
                code: 2,
                message: "Invalid Param Passed",
            },
        }
    }

    if (token != process.env.AUTHTOKEN) {
        return {
            status: false,
            error: {
                code: 2,
                message: "Invalid Token Passed",
            },
        }
    }

    var req_payload = req.body
    req_payload.model = req_payload.model ? req_payload.model : "gpt-3.5-turbo"
    req_payload["messages"] = prompt
    delete req_payload.prompt
    var apiEndpoint = "https://api.openai.com/v1/chat/completions"
    var res = await generateResponse(req_payload,apiEndpoint)
    return res
}

const getChatGptModelModule = async (req) => {
    var chatModel = ["gpt-4", "gpt-4-0314", "gpt-4-32k", "gpt-4-32k-0314", "gpt-3.5-turbo", "gpt-3.5-turbo-0301"]
    var completionsModel = ["text-davinci-003", "text-davinci-002","text-curie-001", "text-babbage-001", "text-ada-001"]
    
    var result = {
        status:true,
        data:{
            "chat_model":chatModel,
            "completions_model":completionsModel
        }
    }
    return result
}


module.exports = {
    getAnswerModule: getAnswerModule,
    getChatGptModelModule:getChatGptModelModule,
    getAnswerChatModule:getAnswerChatModule
}
