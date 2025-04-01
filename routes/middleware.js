const crud = require("./crud")

const checkAccessToken = async (req, res, next) => {
    var authTokenHeader = req.cookies["fm-ssid"] || req.headers["authorization"]
    if (authTokenHeader) authTokenHeader = authTokenHeader.replace("Bearer ", "")
    var accessToken = authTokenHeader

    if (accessToken === undefined) {
        return res.status(401).send({
            status: false,
            error: {
                code: 401,
                message: "Error invalid authentication found"
            }
        })
    }
    var date = new Date()

    let currentTimeStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const sql = `SELECT user_id
    FROM user_access_token
    WHERE user_access_token_value = '${accessToken}'
    AND user_access_token_expiry_time >= '${currentTimeStamp}'
    AND user_access_token_flag_logout = false `

    const getUserIdByATokenDB = await crud.executeQuery(sql)
    console.log("Printing the output of getUserIdByATokenDB : ", getUserIdByATokenDB)

    if (getUserIdByATokenDB.data.length < 1) {
        return res.status(401).send({
            status: false,
            error: {
                code: 404,
                message: "Error invalid authentication found."
            }
        })
    }

    req.user_data = getUserIdByATokenDB.data[0].user_id
    req.user_id = getUserIdByATokenDB.data[0].user_id
    next()
}
module.exports = {
    checkAccessToken: checkAccessToken
}
