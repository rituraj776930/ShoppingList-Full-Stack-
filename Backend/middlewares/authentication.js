var jwt = require('jsonwebtoken')
var SECRET = 'MOCK10'

const authentication = async (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(400).send({message:"You are not authorized"})
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET, function(err, decoded) {
        if(decoded){
            req.body.userId = decoded.userId
            next()
        }
        else{
            res.status(400).send({message:"You are not authorized.Please login again"})
        }
    });
}

module.exports = authentication