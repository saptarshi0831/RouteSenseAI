const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");
const { generateToken } = require("../utils/jwt");

const signup = async ({
    name,
    email,
    password,
}) => {
    const existingUser =
        await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    // Store user in database
    const user =
        await userRepository.createUser({
            name,
            email,
            password: hashedPassword,
            role: email === 'admin@routesense.ai' ? 'admin' : 'user'
        });

    // Generate JWT token
    const token = generateToken({
        id: user.id,
        email: user.email,
    });

    const {password: _, ...safeUser} = user;

    return {
        user: safeUser,
        token,
    };
};

const login = async ({
    email,
    password,
}) => {
    const user =
        await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
    });

    const {password: _, ...safeUser} = user;

    return {
        user: safeUser,
        token,
    };
};

// TEST DEBUG
// const login = async ({ email, password }) => {
//     console.log("Login email:", email);

//     const user = await userRepository.findByEmail(email);

//     console.log("User found:", user);

//     if (!user) {
//         throw new Error("User not found");
//     }

//     const isMatch = await bcrypt.compare(
//         password,
//         user.password
//     );

//     console.log("Password Match:", isMatch);

//     if (!isMatch) {
//         throw new Error("Password mismatch");
//     }

//     const token = generateToken({
//         id: user.id,
//         email: user.email,
//     });

//     const { password: _, ...safeUser } = user;

//     return {
//         user: safeUser,
//         token,
//     };
// };

module.exports = {
    signup,
    login,
};