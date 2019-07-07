const jwt  = require("jsonwebtoken")
const config = require("config")

// used to ensure there is a token in the response header
module.exports = function(req, res, next) {
    //    Get the token from the header
    const token = req.header("x-auth-token")

    //    Check if not token
    if (!token) {
        return res.status(401).json({msg: "No token, authorization denied."})
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        //so we have access to user inside the route
        req.user = decoded.user
        next()
    }
    catch {
        return res.status(401).json({msg: "Token is not valid."})
    }
}