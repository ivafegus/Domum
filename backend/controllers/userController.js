const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) => {
    const users = await User.find()

    res.status(200).json(users)
}

const getUser = async(req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).json(user)
}

const addUser = async(req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).json(user);
    } catch(error) {
        res.json("Entered information is not valid.")
    }  
}

const loginUser = async(req, res, next) => {
    User.authenticate(req.body.username, req.body.password, function(err, user){
        if(err || !user){
            var err = new Error('Wrong username or paassword');
            err.status = 401;
            return next(err);
        }
        
        const accessToken = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

        /* 
        This token needs to be saved on the client side, so every user action sends the token for an authorization check
        For now, this function returns a token, that needs to be manually inserted into:
        Authorization tab 
        Type: Bearer
        Token: accessToken
        */

        return res.json({accessToken: accessToken, admin: user.admin}); 
    });
}

// When you update, you need to save the hashed version insted of normal text!!!
const updateUser = async(req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedUser)
}

const deleteUser = async(req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({ id: req.params.id })
}

module.exports = {
    getUsers,
    getUser,
    loginUser,
    addUser,
    updateUser,
    deleteUser
}