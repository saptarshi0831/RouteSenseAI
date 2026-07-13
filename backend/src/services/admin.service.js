const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async () => {
    const totalSOS = await prisma.emergency.count({
        where: {
            createdAt: {
                gte: new Date(new Date().setHours(0,0,0,0))
            }
        }
    });

    const pendingSOS = await prisma.emergency.count({
        where: { status: "ACTIVE" }
    });

    const resolvedSOS = await prisma.emergency.count({
        where: { status: "RESOLVED" }
    });

    const users = await prisma.user.count();

    return { total: totalSOS, pending: pendingSOS, resolved: resolvedSOS, users };
};

const acknowledgeSOS = async (emergencyId, io) => {
    const emergency = await prisma.emergency.update({
        where: { id: emergencyId },
        data: { status: "RESPONDING" }
    });

    // Emit notification to user
    io.to(`user:${emergency.userId}`).emit("notification:new", {
        title: "🚑 SOS Received",
        message: "Emergency team has acknowledged your request. Help is on the way.",
        type: "success",
        time: new Date()
    });

    return emergency;
};

const resolveSOS = async (emergencyId, io) => {
    const emergency = await prisma.emergency.update({
        where: { id: emergencyId },
        data: { status: "RESOLVED" }
    });

    // Emit notification to user
    io.to(`user:${emergency.userId}`).emit("notification:new", {
        title: "✅ Emergency Closed",
        message: "Your emergency request has been marked as resolved.",
        type: "info",
        time: new Date()
    });

    return emergency;
};

module.exports = { getDashboardStats, acknowledgeSOS, resolveSOS };
