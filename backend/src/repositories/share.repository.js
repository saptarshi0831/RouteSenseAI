const prisma = require("../config/db");

// creating a new share seesion
const createSession = async (data) => {
    return prisma.shareSession.create({
        data,
    });
};

// finding session by code
const findByShareCode = async (shareCode) => {
    return prisma.shareSession.findUnique({
        where: { shareCode, },
        include: {
            creator: true,
            participants: {
                include: {
                    user: true,
                },
            },
        },
    });
};

// find session by ID
const findById = async (shareCode) => {
    return prisma.shareSession.findUnique({
        where: { id, },
    });
};

// add participant
const addParticipant = async ({sessionId, userId,}) => {
    return prisma.sessionParticipant.create({
        data: {
            sessionId,
            userId,
        },
    });
};

// Get all participants
const getParticipants = async (sessionId) => {
    return prisma.sessionParticipant.findMany({
        where: {sessionId,},
        include: {user: true,},
    });
};

// End Session
// End session by share code
const endSessionByShareCode = async (shareCode) => {
  return prisma.shareSession.update({
    where: {
      shareCode,
    },
    data: {
      isActive: false,
    },
  });
};

module.exports = {
    createSession,
    findByShareCode,
    findById,
    addParticipant,
    getParticipants,
    endSessionByShareCode,
};