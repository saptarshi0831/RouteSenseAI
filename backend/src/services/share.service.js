const shareRepository = require("../repositories/share.repository");
const generateShareCode = require("../utils/shareCode");
const notificationService = require("./notification.service");

const createShareSession = async ({
  creatorId,
  durationHours = 6,
}) => {
  // Generate expiry date
  const expiresAt = new Date(
    Date.now() + durationHours * 60 * 60 * 1000
  );

  let shareCode;
  let existingSession;

  // Ensure share code is unique
  do {
    shareCode = generateShareCode();
    existingSession = await shareRepository.findByShareCode(
      shareCode
    );
  } while (existingSession);

  // Create session
  const session = await shareRepository.createSession({
    shareCode,
    creatorId,
    expiresAt,
  });

  // Automatically add creator as participant
  await shareRepository.addParticipant({
    sessionId: session.id,
    userId: creatorId,
  });

  // Send Socket.IO notification
  notificationService.sendNotification({
    userId: creatorId,
    title: "Location Shared",
    message: "Live location sharing started.",
    type: "share",
  });

  return {
    shareCode,
    shareUrl: `${process.env.FRONTEND_URL}/share/${shareCode}`,
    expiresAt,
  };
};

const joinShareSession = async ({
  shareCode,
  userId,
}) => {
  const session = await shareRepository.findByShareCode(
    shareCode
  );

  if (!session) {
    throw new Error("Share session not found");
  }

  if (!session.isActive) {
    throw new Error("Share session has ended");
  }

  if (
    session.expiresAt &&
    session.expiresAt < new Date()
  ) {
    throw new Error("Share session expired");
  }

  const alreadyJoined = session.participants.find(
    (participant) => participant.userId === userId
  );

  if (!alreadyJoined) {
    await shareRepository.addParticipant({
      sessionId: session.id,
      userId,
    });
  }

  return session;
};

const getShareSession = async (shareCode) => {
  const session = await shareRepository.findByShareCode(
    shareCode
  );

  if (!session) {
    throw new Error("Share session not found");
  }

  if (!session.isActive) {
    throw new Error("Share session has ended");
  }

  return session;
};

const endShareSession = async ({
  shareCode,
}) => {
  const session = await shareRepository.findByShareCode(
    shareCode
  );

  if (!session) {
    throw new Error("Share session not found");
  }

  return shareRepository.endSessionByShareCode(
    shareCode
  );
};

module.exports = {
  createShareSession,
  joinShareSession,
  getShareSession,
  endShareSession,
};