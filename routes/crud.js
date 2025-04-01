const client = require("../connection/database")
console.log("crud")
module.exports.executeQuery = async (que) => {
    console.log("timestamp---->"+new Date());
    // query=escape(query);
    console.log(que)
    var obj = {}
    try {
        //console.log("entered");
        var res = await client.query(que)
        //console.log("entered");
        obj = {
            status: true,
            data: res.rows
        }
    } catch (err) {
        //console.log("err");
        console.log(err);
        obj = {
            status: false,
            data: []
        }
    }
    // //console.log(res)
    return obj
}
