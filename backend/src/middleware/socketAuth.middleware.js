const { verifyToken } = require("../utils/jwt")

const socketAuth = (socket, next) => {
    const token = socket.handshake.auth.token;

    if(!token) {
        return next(new Error("Authentication Required!"));

    }
    try{
        const decoded = verifyToken(token);

        socket.user = decoded;
        
        next();
    }catch (error){
        next(new Error("Invalid token"))
    }
};

module.exports = socketAuth;