const prisma = require("../config/db");

const findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

const createUser = async (userData) => {
    return prisma.user.create({
        data: userData,
    });
};

const findById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

module.exports = {
    findByEmail,
    createUser, 
    findById
}