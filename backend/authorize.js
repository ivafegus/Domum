function authorizeAdmin(req, res, next) {
    if(req.user && req.user.admin){
        next()
    }else{
        return res.status(403).json("You don't have permission to access this data")
    }
}

module.exports = authorizeAdmin