var express = require("express")
var router = express.Router()
/* GET home page. */

router.use("/api/chat", require("./api/chat"))

router.use("**", (req, res) => {
    return res.send({
        status: false,
        error: {
            "code": 500,
            "message": "Error Invalid API Request"
        },
    })
})


module.exports = router
